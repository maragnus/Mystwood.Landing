using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Mystwood.Landing.Data.Validators
{
    internal record TraitInfo
    {
        public string TraitId = "";
        public string Name = "";
        public string GroupName = "";
        public int GroupRank;
        public TraitType Type;
        public TraitAssociationType AssociationType;
    }

    internal class CharacterValidatorContext
    {
        private readonly CharacterValidationResult result = new();
        private readonly ILookup<TraitType, TraitInfo> _traitLookup;
        private readonly Character _character;
        private readonly GiftTrait[] _gifts;
        private readonly SkillTrait[] _skills;

        public CharacterValidationResult Result => result;

        public CharacterValidatorContext(Character character, ILookup<TraitType, TraitInfo> traitLookup, GiftTrait[] gifts, SkillTrait[] skills)
        {
            _character = character;
            _traitLookup = traitLookup;
            _gifts = gifts;
            _skills = skills;
        }

        public void ValidateGifts()
        {
            var myGifts = _traitLookup[TraitType.Gift];
            var hasBackstory = !string.IsNullOrWhiteSpace(_character.PublicHistory);

            // Free traits
            if (hasBackstory)
                result.AssertEqual(6, myGifts.Count(i => i.AssociationType == TraitAssociationType.Free), () => "Expected to have exactly 6 free gifts with backstory");
            else
                result.AssertEqual(5, myGifts.Count(i => i.AssociationType == TraitAssociationType.Free), () => "Expected to have exactly 5 free gifts without backstory");

            if (!myGifts.All(i => i.AssociationType == TraitAssociationType.Free || i.AssociationType == TraitAssociationType.Purchased))
                result.Assert(() => "Gifts must only be Free or Purchased");

            // Contiguous free traits
            var gifts = myGifts
                .GroupBy(i => i.GroupName)
                .Select(i => new
                {
                    GiftName = i.Key,
                    AssociationTypes = i.OrderBy(i => i.GroupRank).Select(i => i.AssociationType)
                });

            foreach (var gift in gifts)
            {
                var invalid = gift.AssociationTypes
                    .SkipWhile(i => i == TraitAssociationType.Free)
                    .Any(i => i != TraitAssociationType.Purchased);
                if (!invalid)
                    result.Assert(() => $"All Free Gifts must appear prior to Purchased Gifts in {gift.GiftName}");
            }

            Result.AssertEqual(myGifts.Count(), _character.Level, () => $"Characer level ({_character.Level}) is expect to equal the number of gifts ({myGifts.Count()})");
        }

        public void ValidateRankedTraits()
        {
            // The following traits do not allow redundant ranks
            ValidateRedundantTraits(_traitLookup[TraitType.Ability]);
            ValidateRedundantTraits(_traitLookup[TraitType.Advantage]);
            ValidateRedundantTraits(_traitLookup[TraitType.Disadvantage]);
            ValidateRedundantTraits(_traitLookup[TraitType.Skill]);
        }

        private void ValidateRedundantTraits(IEnumerable<TraitInfo> traits)
        {
            var redundants = traits
                .GroupBy(i => i.GroupName)
                .Where(i => i.Count() > 1);

            foreach (var trait in redundants)
                result.Assert(() => $"Multiple {trait.First().Type} of {trait.Key} in ranks {string.Join(" and ", trait.Select(i => i.GroupRank))}");
        }

        public void ValidateMoonstone()
        {
            // Gifts cost the character's level, the first 5 or 6 levels are free
            var startingLevel = string.IsNullOrWhiteSpace(_character.PublicHistory) ? 5 : 6;
            var currentLevel = _traitLookup[TraitType.Gift].Count();
            var giftCost = Math.Max(0, triangle(currentLevel) - triangle(startingLevel));

            // Skills cost their Cost, +1 for each purchased skill after the first
            var skills =
                from trait in _traitLookup[TraitType.Skill]
                join skill in _skills on trait.TraitId equals skill.TraitId
                where isPurchased(trait)
                select skill.Cost;
            var skillCost = skills.DefaultIfEmpty(0).Sum() ?? 0 + skills.Count() - 1;

            // The total cost is all skills minus skill tokens
            var totalCost = giftCost + skillCost - _character.SkillTokens;

            result.AssertEqual(_character.MoonstoneSpent, totalCost, () => $"Moonstone cost of {_character.MoonstoneSpent} does not match purchased traits at {totalCost}");

            bool isPurchased(TraitInfo traitInfo) => traitInfo.AssociationType == TraitAssociationType.Purchased;
        }

        // https://en.wikipedia.org/wiki/Triangular_number
        private static int triangle(int level) => level * (level + 1) / 2;
    }


    public class CharacterValidator
    {
        private readonly MystwoodDatabase _db;
        private readonly ILogger _logger;

        public CharacterValidator(MystwoodDatabase db, ILogger<CharacterValidator> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<CharacterValidationResult> ValidateAsync(Character character)
        {
            // Split out traits by type
            var traitTypes = await _db.CacheTraits();
            var traitLookup =
                (from trait in character.Traits
                 let type = traitTypes[trait.TraitId!]
                 select new TraitInfo
                 {
                     TraitId = type.TraitId!,
                     Name = type.Name!,
                     GroupName = type.GroupName!,
                     GroupRank = type.GroupRank,
                     Type = type.Type,
                     AssociationType = trait.Type
                 })
              .ToLookup(t => t.Type);

            var traits = character.Traits.Select(i => i.TraitId!).ToHashSet();
            var gifts = await _db.CacheTraits<GiftTrait>(traits);
            var skills = await _db.CacheTraits<SkillTrait>(traits);

            var context = new CharacterValidatorContext(character, traitLookup, gifts, skills);

            try
            {
                context.ValidateGifts();
                context.ValidateRankedTraits();
                context.ValidateMoonstone();
            }
            catch (Exception ex)
            {
                context.Result.Assert(() => $"Failed to validate due to exception: {ex.Message}");
                _logger.LogError(ex, "Validation failed due to exception");
            }

            _logger.LogInformation(context.Result.ToString());

            return context.Result;
        }
    }
}

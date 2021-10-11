using Microsoft.Extensions.Logging;
using Mystwood.Landing.Data.Validators.Internal;

namespace Mystwood.Landing.Data.Validators;

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
            Validate<Rules.FreeTraitsContiguousRule>(context);
            Validate<Rules.GiftsAreValidRule>(context);
            Validate<Rules.NoRedunantTraitRule>(context);
            Validate<Rules.MoonstoneCostRule>(context);
        }
        catch (Exception ex)
        {
            context.Result.Assert(() => $"Failed to validate due to exception: {ex.Message}");
            _logger.LogError(ex, "Validation failed due to exception");
        }

        _logger.LogInformation(context.Result.ToString());

        return context.Result;
    }

    private static void Validate<TRule>(CharacterValidatorContext context) where TRule : Rules.BaseCharacterValidatorRule, new() =>
        new TRule().Validate(context);
}

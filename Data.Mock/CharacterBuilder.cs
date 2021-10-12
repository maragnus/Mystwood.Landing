using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Mystwood.Landing.Data.Mock
{
    public record CharacterTrait
    {
        public string TraitName;
        public TraitType Type;
        public TraitAssociationType Association;

        public CharacterTrait(string traitName, TraitType type, TraitAssociationType association)
        {
            TraitName = traitName;
            Type = type;
            Association = association;
        }
    }

    public class CharacterBuilder : BaseBuilder
    {
        private readonly PlayerBuilder _playerFactory;
        private readonly string _name;
        private readonly List<CharacterTrait> _traits = new();
        private string? _publicHistory;
        private string? _privateHistory;
        private int? _moonstone;
        private int? _skillTokens;

        public string CharacterId { get; } = ObjectId.GenerateNewId().ToString();

        public bool HasBackstory => !string.IsNullOrWhiteSpace(_publicHistory);

        public CharacterBuilder(PlayerBuilder playerFactory, string name)
        {
            _playerFactory = playerFactory;
            _name = name;
        }

        public static async Task<Dictionary<(TraitType Type, string), string>> GetTraitLookup(MystwoodDatabase db) =>
            (await db.Traits.Find(_ => true).ToListAsync())
                .ToDictionary(t => (t.Type, t.Name!), t => t.TraitId!);

        public Character Build(Dictionary<(TraitType, string), string> traitLookup)
        {
            var startingLevel = HasBackstory ? Constants.StartinLevelWithBackstory : Constants.StartinLevelWithoutBackstory;
            var traits = ExtrapolateTraits(traitLookup);

            return new()
            {
                CharacterId = CharacterId,
                PlayerId = _playerFactory.PlayerId,
                Name = _name,
                Level = _traits.Count(i => i.Type == TraitType.Gift),
                Traits = traits,
                PublicHistory = _publicHistory,
                PrivateHistory = _privateHistory,
                StartingLevel = startingLevel,
                MoonstoneSpent = _moonstone ?? Constants.LevelCost(startingLevel, traitLookup.Count(i => i.Key.Item1 == TraitType.Gift))
                    + traits.Sum(i => i.Moonstone ?? 0),
                SkillTokens = _skillTokens ?? 0,
            };
        }

        private TraitAssociation[] ExtrapolateTraits(Dictionary<(TraitType, string), string> traitLookup) => _traits
            .Select(i => new TraitAssociation
            {
                TraitId = traitLookup[(i.Type, i.TraitName)],
                Type = i.Association
            })

            .ToArray();

        public CharacterBuilder WithGift(string giftName, params TraitAssociationType[] ranks)
        {
            _traits.AddRange(ranks.Select((a, index) => new CharacterTrait($"{giftName} {index + 1}", TraitType.Gift, a)));

            return this;
        }

        public CharacterBuilder WithPublicHistory(string story)
        {
            _publicHistory = story;
            return this;
        }

        public CharacterBuilder WithPrivateHistory(string story)
        {
            _privateHistory = story;
            return this;
        }
        public CharacterBuilder WithMoonstone(int moonstone, int skillTokens)
        {
            _moonstone = moonstone;
            _skillTokens = skillTokens;
            return this;
        }
    }
}

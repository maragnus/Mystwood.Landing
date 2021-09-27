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

        public string CharacterId { get; } = ObjectId.GenerateNewId().ToString();

        public CharacterBuilder(PlayerBuilder playerFactory, string name)
        {
            _playerFactory = playerFactory;
            _name = name;
        }

        public static async Task<Dictionary<(TraitType Type, string), string>> GetTraitLookup(MystwoodDatabase db) =>
            (await db.Traits.Find(_ => true).ToListAsync())
                .ToDictionary(t => (t.Type, t.Name!), t => t.TraitId!);

        public Character Build(Dictionary<(TraitType, string), string> traitLookup) => new()
        {
            CharacterId = CharacterId,
            PlayerId = _playerFactory.PlayerId,
            Name = _name,
            Level = _traits.Count(i => i.Type == TraitType.Gift),
            Traits = ExtrapolateTraits(traitLookup),
            PublicHistory = _publicHistory,
            PrivateHistory = _privateHistory,
        };

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
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Mystwood.Landing.Data
{

    public record CharacterSummary
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId CharacterId;
        public ObjectId PlayerId;

        public string? Name;

        public int Level;

        public string? Occupation;

        public string? OccupationalEnhancement;

        public string? Religion;

        public string? Homeland;
    }

    public record Character : CharacterSummary
    {
        public EventParticipation[] Events = Array.Empty<EventParticipation>();

        public Gifts Gifts = new Gifts();

        public string[] Advantages = Array.Empty<string>();

        public string[] Disadvantages = Array.Empty<string>();

        public string[] Skills = Array.Empty<string>();

        public string[] PurchasedSkills = Array.Empty<string>();

        public string[] Spells = Array.Empty<string>();

        public string[] Cures = Array.Empty<string>();

        public string[] Documents = Array.Empty<string>();

        public string[] UnusualFeatures = Array.Empty<string>();

        public string? PublicHistory;

        public string? PrivateHistory;
    }

    public record Gifts
    {
        public int Courage;
        public int Dexterity;
        public int Empathy;
        public int Passion;
        public int Prowess;
        public int Wisdom;
    }

    /// <summary>
    /// Intermediate class for Aggregates with Player
    /// </summary>
    public record CharacterWithPlayers : Character
    {
        public IEnumerable<Player> Players = Array.Empty<Player>();
    }

    /// <summary>
    /// Resulting Projection for Aggregate with Player
    /// </summary>
    public record CharacterWithPlayer : Character
    {
        public CharacterWithPlayer() { }

        public CharacterWithPlayer(Character c) : base(c) { }

        public CharacterWithPlayer(CharacterWithPlayer cwp) : base(cwp) =>
            Player = cwp.Player;

        public CharacterWithPlayer(CharacterWithPlayers cwps) : base(cwps) =>
            Player = cwps.Players.FirstOrDefault();

        public Player? Player;
    }

}

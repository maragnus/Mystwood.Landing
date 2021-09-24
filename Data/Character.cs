using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{

    public record CharacterSummary
    {
        [BsonId, BsonIgnoreIfDefault, BsonRepresentation(BsonType.ObjectId)]
        public string? CharacterId;
        [BsonRepresentation(BsonType.ObjectId)]
        public string? PlayerId;

        public string? Name;

        public int Level;

        public string? Religion;

        public string? Homeland;
    }

    public record Character : CharacterSummary
    {
        public EventParticipation[] Events = Array.Empty<EventParticipation>();

        public TraitAssociation[] Traits = Array.Empty<TraitAssociation>();

        public string[] Spells = Array.Empty<string>();

        public string[] Cures = Array.Empty<string>();

        public string[] Documents = Array.Empty<string>();

        public string[] UnusualFeatures = Array.Empty<string>();

        public string? PublicHistory;

        public string? PrivateHistory;
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

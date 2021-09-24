using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public record Player
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId, BsonIgnoreIfDefault]
        public string? PlayerId;

        public string? Name;
        public string? PrimaryEmail;
        public string[] Emails = Array.Empty<string>();

        // Contains PrimaryEmail and Emails[*] as uppercase
        public string[] NormalizedEmails = Array.Empty<string>();

        public EventParticipation[] Events = Array.Empty<EventParticipation>();
    }

    public record PlayerWithCharacters : Player
    {
        public IEnumerable<Character> Characters = Array.Empty<Character>();
    }
}

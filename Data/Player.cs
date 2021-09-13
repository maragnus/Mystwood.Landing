using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Mystwood.Landing.Data
{
    public record Player
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator)), BsonIgnoreIfDefault]
        public ObjectId? PlayerId;

        public string? Name;
        public string? PrimaryEmail;
        public string[] Emails = Array.Empty<string>();

        public string? HashedPassword;

        public EventParticipation[] Events = Array.Empty<EventParticipation>();
    }

    public record PlayerWithCharacters : Player
    {
        public IEnumerable<Character> Characters = Array.Empty<Character>();
    }
}

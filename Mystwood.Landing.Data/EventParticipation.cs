using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Mystwood.Landing.Data
{
    public record EventParticipation
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string EventId;
        public bool Participated;
        public int EarnedMoonstone;
        public string Role;

        [JsonIgnore]
        public Event Event;
    }
}

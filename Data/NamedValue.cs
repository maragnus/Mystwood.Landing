using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public record NamedValue
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId, BsonIgnoreIfDefault]
        public string? Id;
        public string Name = "";
        public string Value = "";
    }
}

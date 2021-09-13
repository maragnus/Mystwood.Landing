using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Mystwood.Landing.Data
{
    public record NamedValue
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator)), BsonIgnoreIfDefault]
        public ObjectId? Id;
        public string Name = "";
        public string Value = "";
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Mystwood.Landing.Data
{
    public record Event
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId EventId;
        public string? Name;
        public DateOnly? StartDate;
        public DateOnly? EndDate;
    }
}

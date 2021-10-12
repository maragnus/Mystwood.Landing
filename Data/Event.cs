using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public record Event
    {
        [BsonId, BsonIgnoreIfDefault, BsonRepresentation(BsonType.ObjectId)]
        public string? EventId;
        public string? Name;
        public DateOnly? StartDate;
        public DateOnly? EndDate;
    }
}

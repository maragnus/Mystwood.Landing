using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public record EventParticipation
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? EventId;
        public bool Participated;
        public int EarnedMoonstone;
        public string? Role;
    }

    public record EventParticipationWithEvents : EventParticipation
    {
        public Event[] Events = Array.Empty<Event>();
    }

    public record EventParticipationWithEvent : EventParticipation
    {
        public Event? Event;
    }
}

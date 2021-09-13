using MongoDB.Bson;

namespace Mystwood.Landing.Data
{
    public record EventParticipation
    {
        public ObjectId EventId;
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

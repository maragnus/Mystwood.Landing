using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Options;
using Mystwood.Landing.Data;
using Mystwood.Landing.GrpcLarp;
using DbAccountAttendance = Mystwood.Landing.Data.AccountAttendance;
using Event = Mystwood.Landing.GrpcLarp.Event;

namespace Mystwood.Landing
{
    public interface IEventManager
    {
        Task<IEnumerable<Event>> GetEvents(int? accountId);
        Task<EventRsvp?> GetRsvp(int eventId, int accountId);
        Task SetRsvp(int eventId, int accountId, EventRsvp rsvp, int updatedByAccountId);
        Task<Event> GetEvent(int eventId);
    }

    public class EventManager : IEventManager
    {
        private readonly ApplicationDbContext _db;
        private readonly ISystemClock _clock;
        private readonly MystwoodOptions _options;

        public EventManager(ApplicationDbContext db, ISystemClock systemClock, IOptions<MystwoodOptions> options)
        {
            _db = db;
            _clock = systemClock;
            _options = options.Value;
        }

        public async Task<Event> GetEvent(int eventId)
        {
            var e = await _db.Events.SingleAsync();

            return new Event
            {
                EventId = e.Id!.Value,
                Title = e.Title ?? "",
                Date = e.EventDate.HasValue ? e.EventDate.Value.ToString("o") : "",
                Location = e.Location,
                Rsvp = e.Rsvp ?? false,
                EventType = e.EventType.ToString(),
            };
        }

        public async Task<IEnumerable<Event>> GetEvents(int? accountId)
        {
            var events = await _db.Events.ToListAsync();

            return events.Select(e => new Event
            {
                EventId = e.Id!.Value,
                Title = e.Title ?? "",
                Date = e.EventDate.HasValue ? e.EventDate.Value.ToString("o") : "",
                Location = e.Location,
                Rsvp = e.Rsvp ?? false,
                EventType = e.EventType.ToString(),
            });
        }

        public async Task<EventRsvp?> GetRsvp(int eventId, int accountId)
        {
            var attendee = await _db.AccountAttendances
                .SingleOrDefaultAsync(x => x.EventId == eventId && x.AccountId == accountId);

            return Enum.TryParse<EventRsvp>(attendee?.Rsvp ?? "", out var rsvp)
                ? rsvp : EventRsvp.Unanswered;
        }

        public async Task SetRsvp(int eventId, int accountId, EventRsvp rsvp, int updatedByAccountId)
        {
            var attendee = await _db.AccountAttendances
                .SingleOrDefaultAsync(x => x.EventId == eventId && x.AccountId == accountId);

            if (!Enum.TryParse<EventRsvp>(attendee?.Rsvp ?? "", out var currentRsvp))
                currentRsvp = EventRsvp.Unanswered;

            if (currentRsvp == rsvp)
                return;

            if (attendee == null)
            {
                attendee = new DbAccountAttendance
                {
                    AccountId = accountId,
                    EventId = eventId
                };
                _db.AccountAttendances.Add(attendee);
            }
            attendee.Rsvp = rsvp.ToString();
            attendee.AccountAttendanceUpdates.Add(new AccountAttendanceUpdate
            {
                Rsvp = attendee.Rsvp,
                UpdatedByAccountId = updatedByAccountId,
                UpdatedOn = _clock.UtcNow

            });
            await _db.SaveChangesAsync();
        }
    }
}

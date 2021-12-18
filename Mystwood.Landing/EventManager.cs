using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Options;
using Mystwood.Landing.Data;
using Mystwood.Landing.GrpcLarp;
using AccountAttendance = Mystwood.Landing.GrpcLarp.AccountAttendance;
using DbAccountAttendance = Mystwood.Landing.Data.AccountAttendance;
using DbEvent = Mystwood.Landing.Data.Event;
using Event = Mystwood.Landing.GrpcLarp.Event;

namespace Mystwood.Landing
{
    public interface IEventManager
    {
        Task<IEnumerable<Event>> GetEvents(int? accountId);
        Task<IEnumerable<Event>> GetEventsAdmin();
        Task<EventRsvp?> GetRsvp(int eventId, int accountId);
        Task SetRsvp(int eventId, int accountId, EventRsvp rsvp, int updatedByAccountId);
        Task<Event> GetEvent(int eventId, int? accountId);
        Task<Event> GetEventAdmin(int eventId);
        Task<Event> AddOrUpdateEvent(Event @event);
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

        public async Task<Event> AddOrUpdateEvent(Event e)
        {
            var dbEvent = (e.EventId > 0)
                ? await _db.Events.FindAsync(e.EventId)
                : null;

            if (dbEvent == null)
            {
                dbEvent = new DbEvent();
                _db.Events.Add(dbEvent);
            }

            dbEvent.Location = e.Location;
            dbEvent.Title = e.Title;
            dbEvent.Rsvp = e.Rsvp;
            dbEvent.Hidden = e.Hidden;
            dbEvent.EventType = Enum.TryParse<EventType>(e.EventType, out var type) ? type : EventType.Other;
            dbEvent.EventDate = DateTime.TryParse(e.Date, out var date) ? date : null;

            await _db.SaveChangesAsync();

            return DbEventToEvent(dbEvent);
        }

        public async Task<Event> GetEvent(int eventId, int? accountId)
        {
            var dbEvent = await _db.Events
                .Include(x => x.AccountAttendances) // TODO -- filter this
                .SingleAsync(x => x.Id == eventId);
            return DbEventToEvent(dbEvent);
        }

        public async Task<Event> GetEventAdmin(int eventId)
        {
            var dbEvent = await _db.Events
                .Include(x => x.AccountAttendances)
                .SingleAsync(x => x.Id == eventId);
            return DbEventToEvent(dbEvent);
        }

        private static Event DbEventToEvent(DbEvent dbEvent)
        {
            var e = new Event
            {
                EventId = dbEvent.Id!.Value,
                Title = dbEvent.Title ?? "",
                Date = dbEvent.EventDate.HasValue ? dbEvent.EventDate.Value.ToString("o") : "",
                Location = dbEvent.Location,
                Rsvp = dbEvent.Rsvp ?? false,
                Hidden = dbEvent.Hidden ?? false,
                EventType = dbEvent.EventType.ToString(),
            };

            e.Attendees.AddRange(dbEvent.AccountAttendances.Select(x => new AccountAttendance
            {
                AccountId = x.AccountId!.Value,
                Moonstone = x.Moonstone ?? 0,
                Rsvp = Enum.TryParse<EventRsvp>(x.Rsvp, out var rsvp) ? rsvp : EventRsvp.Unanswered
            }));

            return e;
        }

        public async Task<IEnumerable<Event>> GetEvents(int? accountId)
        {
            var attendances = await _db.AccountAttendances
                .Where(x => x.AccountId == accountId)
                .ToListAsync();

            var events = await _db.Events
                .Where(x => x.Hidden == false)
                .ToDictionaryAsync(x => x.Id!.Value);

            foreach (var attendance in attendances)
            {
                if (events.TryGetValue(attendance.EventId!.Value, out var e))
                    e.AccountAttendances.Add(attendance);
            }

            return events.Select(e => DbEventToEvent(e.Value));
        }

        public async Task<IEnumerable<Event>> GetEventsAdmin()
        {
            var events = await _db.Events
                .Include(x => x.CharacterAttendances)
                .ToListAsync();

            return events.Select(e => DbEventToEvent(e));
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

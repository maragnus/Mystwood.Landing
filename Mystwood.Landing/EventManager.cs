using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Options;
using Mystwood.Landing.Data;
using Event = Mystwood.Landing.GrpcLarp.Event;

namespace Mystwood.Landing
{
    public interface IEventManager
    {
        Task<IEnumerable<Event>> GetEvents(int? accountId);
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

        public async Task<IEnumerable<Event>> GetEvents(int? accountId)
        {
            var events = await _db.Events.ToListAsync();

            return events.Select(e => new Event
            {
                EventId = e.Id!.Value,
                Title = e.Title ?? "",
                Date = e.EventDate.HasValue ? e.EventDate.Value.ToString("o") : "",
                Location = e.Location,
                EventType = e.EventType.ToString(),
            });
        }
    }
}

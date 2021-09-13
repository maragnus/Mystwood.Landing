using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Mystwood.Landing.Data
{
    public interface IMystwoodDatabase
    {
        public IMongoCollection<Player> Players { get; }

        public IMongoCollection<Event> Events { get; }

        public IMongoCollection<Character> Characters { get; }

        Task<bool> HealthCheckAsync();
    }

    public class MystwoodDatabase : IMystwoodDatabase, IDisposable
    {
        private readonly ILogger<MystwoodDatabase> _logger;
        private readonly MystwoodDatabaseOptions _options;

        public MongoClient Connection { get; }

        public IMongoDatabase Database { get; }

        public IMongoCollection<Player> Players { get; }

        public IMongoCollection<Event> Events { get; }

        public IMongoCollection<Character> Characters { get; }

        public MystwoodDatabase(IOptions<MystwoodDatabaseOptions> options, ILogger<MystwoodDatabase> logger)
        {
            _logger = logger;
            _options = options.Value;

            Connection = new MongoClient(_options.ConnectionString);
            Database = Connection.GetDatabase(_options.DatabaseName);
            Players = Database.GetCollection<Player>(nameof(Player));
            Events = Database.GetCollection<Event>(nameof(Event));
            Characters = Database.GetCollection<Character>(nameof(Character));
        }

        public void Dispose()
        {

        }

        public async Task<bool> HealthCheckAsync()
        {
            try
            {
                await Players.ReplaceOneAsync<Player>(x => x.PrimaryEmail == "test",
                    new Player
                    {
                        PrimaryEmail = "test",
                        Name = "Test User"
                    }, new ReplaceOptions { IsUpsert = true });
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, $"{nameof(MystwoodDatabase)} health check failed");
                return false;
            }
        }
    }
}

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Mystwood.Landing.Data
{
    public interface IMystwoodDatabase
    {
        IMongoCollection<Player> Players { get; }

        IMongoCollection<Event> Events { get; }

        IMongoCollection<Character> Characters { get; }

        IMongoCollection<Trait> Traits { get; }

        Task<string> GetOrCreateValue(string name, Func<string, string> createValue);

        Task<bool> HealthCheckAsync();

        Task<string?> GetPlayerIdByEmail(string email, CancellationToken cancellationToken);

        Task UpdatePlayerProfile(string playerId, string name, string primaryEmail, string[] otherEmails, CancellationToken cancellationToken);
    }

    public class MystwoodDatabase : IMystwoodDatabase, IDisposable
    {
        private readonly ILogger<MystwoodDatabase> _logger;
        private readonly MystwoodDatabaseOptions _options;
        private Dictionary<TraitType, object> _traitCaches = new(12);

        public MongoClient Connection { get; }

        public IMongoDatabase Database { get; }

        public IMongoCollection<Player> Players { get; }

        public IMongoCollection<Event> Events { get; }

        public IMongoCollection<Character> Characters { get; }

        public IMongoCollection<Trait> Traits { get; }

        public IMongoCollection<NamedValue> NamedValues { get; }

        public async Task<string> GetOrCreateValue(string name, Func<string, string> createValue)
        {
            var pair = await NamedValues.Find(kv => kv.Name == name).FirstOrDefaultAsync();
            if (pair != null)
                return pair.Value;

            var value = createValue(name);

            await NamedValues.ReplaceOneAsync(
                kv => kv.Name == name,
                new NamedValue { Name = name, Value = value },
                new ReplaceOptions { IsUpsert = true });

            return value;
        }

        public MystwoodDatabase(IOptions<MystwoodDatabaseOptions> options, ILogger<MystwoodDatabase> logger)
        {
            _logger = logger;
            _options = options.Value;

            Connection = new MongoClient(_options.ConnectionString);
            Database = Connection.GetDatabase(_options.DatabaseName);

            Players = Collection<Player>();
            Events = Collection<Event>();
            Characters = Collection<Character>();
            Traits = Collection<Trait>();
            NamedValues = Collection<NamedValue>();

            IMongoCollection<TEntity> Collection<TEntity>() => Database.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public async ValueTask<IReadOnlyDictionary<string, TraitSummary>> CacheTraits()
        {
            if (!_traitCaches.TryGetValue(TraitType.Unspecified, out var traitCache))
            {
                var traits = (await Traits.Find(_ => true).As<TraitSummary>().ToListAsync())
                    .ToDictionary(i => i.TraitId!);
                _traitCaches[TraitType.Unspecified] = traits;
                return traits;
            }
            return (IReadOnlyDictionary<string, TraitSummary>)traitCache;
        }

        public async ValueTask<IReadOnlyDictionary<string, T>> CacheTraits<T>() where T : Trait, new()
        {
            var traitType = new T().Type; // Is this bad?
            if (!_traitCaches.TryGetValue(traitType, out var traitCache))
            {
                var traits = (await Traits.Find(i => i.Type == traitType).As<T>().ToListAsync())
                    .ToDictionary(i => i.TraitId!);
                _traitCaches[traitType] = traits;
                return traits;
            }
            return (IReadOnlyDictionary<string, T>)traitCache;
        }

        public async ValueTask<T[]> CacheTraits<T>(IReadOnlySet<string> traitIds) where T : Trait, new() =>
            (await CacheTraits<T>()).Values.Where(i => traitIds.Contains(i.TraitId!)).ToArray();

        public void Dispose()
        {
            // Do nothing - CosmosDB driver requires disposal
        }

        public async Task<bool> HealthCheckAsync()
        {
            try
            {
                await NamedValues.ReplaceOneAsync(x => x.Name == "healthcheck",
                    new NamedValue
                    {
                        Name = "healthcheck",
                        Value = "true"
                    }, new ReplaceOptions { IsUpsert = true });
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, $"{nameof(MystwoodDatabase)} health check failed");
                return false;
            }
        }

        public async Task<string?> GetPlayerIdByEmail(string email, CancellationToken cancellationToken)
        {
            var filter = Builders<Player>.Filter.AnyEq(i => i.NormalizedEmails, email.ToUpperInvariant());

            var player = await Players.Find(filter).FirstOrDefaultAsync(cancellationToken);

            return player?.PlayerId;
        }

        public async Task UpdatePlayerProfile(string playerId, string name, string primaryEmail, string[] otherEmails, CancellationToken cancellationToken)
        {
            var filter = Builders<Player>.Filter.Eq(i => i.PlayerId, playerId);
            var update = Builders<Player>.Update
                .Set(i => i.Name, name)
                .Set(i => i.PrimaryEmail, primaryEmail)
                .Set(i => i.Emails, otherEmails)
                .Set(i => i.NormalizedEmails, new[] { primaryEmail }.Concat(otherEmails).Select(i => i.ToUpperInvariant()).ToArray());
            var options = new FindOneAndUpdateOptions<Player, Player>();

            var player = await Players.FindOneAndUpdateAsync(filter, update, options, cancellationToken);
        }
    }
}

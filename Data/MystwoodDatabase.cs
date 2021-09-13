﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Mystwood.Landing.Data
{
    public interface IMystwoodDatabase
    {
        IMongoCollection<Player> Players { get; }

        IMongoCollection<Event> Events { get; }

        IMongoCollection<Character> Characters { get; }

        Task<string> GetOrCreateValue(string name, Func<string, string> createValue);

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
            Players = Database.GetCollection<Player>(nameof(Player));
            Events = Database.GetCollection<Event>(nameof(Event));
            Characters = Database.GetCollection<Character>(nameof(Character));
            NamedValues = Database.GetCollection<NamedValue>(nameof(NamedValue));
        }

        public void Dispose()
        {
            // Do nothing
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
    }
}
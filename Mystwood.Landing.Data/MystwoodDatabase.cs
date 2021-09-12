using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Mystwood.Landing.Data
{
    public class MystwoodDatabase : IDisposable
    {
        private MystwoodDatabaseOptions _options;

        public MongoClient Connection { get; }

        public IMongoDatabase Database { get; }

        public IMongoCollection<Player> Players { get; }

        public IMongoCollection<Event> Events { get; }

        public IMongoCollection<Character> Characters { get; }

        public MystwoodDatabase(IOptions<MystwoodDatabaseOptions> options)
        {
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
    }
}

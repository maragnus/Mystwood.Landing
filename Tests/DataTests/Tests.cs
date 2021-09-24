using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Mongo2Go;
using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using Mystwood.Landing.Data;
using Xunit;

namespace MystwoodDb.Tests
{
    public class Tests : IAsyncLifetime
    {
        private MystwoodDatabase db = null!;

        public async Task DisposeAsync()
        {
            await db.Connection.DropDatabaseAsync("mwlxunit");
        }

        public Task InitializeAsync()
        {
            var mongo = MongoDbRunner.Start();
            var options = new OptionsWrapper<MystwoodDatabaseOptions>(new MystwoodDatabaseOptions()
            {
                ApplicationName = "MystwoodLanding.xunit",
                DatabaseName = "mwlxunit",
                ConnectionString = mongo.ConnectionString
            });
            db = new MystwoodDatabase(options, Mock.Of<ILogger<MystwoodDatabase>>());

            return Task.CompletedTask;
        }

        protected async Task Seed()
        {
            static string id() => ObjectId.GenerateNewId().ToString();

            var event1 = new Event { EventId = id(), Name = "Event 1" };
            await db.Events.InsertOneAsync(event1);

            var event2 = new Event { EventId = id(), Name = "Event 2" };
            await db.Events.InsertOneAsync(event2);

            var event3 = new Event { EventId = id(), Name = "Event 3" };
            await db.Events.InsertOneAsync(event3);

            var player = new Player
            {
                PlayerId = id(),
                Name = "Bob Dylan",
                PrimaryEmail = "bob.dylan@example.com",
                NormalizedEmails = new[] { "bob.dylan@example.com".ToUpperInvariant() }
            };
            await db.Players.InsertOneAsync(player);

            var character1 = new Character
            {
                CharacterId = id(),
                PlayerId = player.PlayerId,
                Name = "Jerry",
                Events = new[] { new EventParticipation { EventId = event1.EventId, Participated = true } }
            };
            await db.Characters.InsertOneAsync(character1);

            var character2 = new Character
            {
                CharacterId = id(),
                PlayerId = player.PlayerId,
                Name = "Marge",
                Events = new[] {
                    new EventParticipation { EventId = event1.EventId, Participated = true },
                    new EventParticipation { EventId = event2.EventId, Participated = true },
                }
            };
            await db.Characters.InsertOneAsync(character2);
        }

        [Fact]
        public async Task Basic_Associations_Work()
        {
            await Seed();

            Assert.Equal(2, await db.Characters.Find(c => true).CountDocumentsAsync());
            Assert.Equal(1, await db.Players.Find(c => true).CountDocumentsAsync());
            Assert.Equal(3, await db.Events.Find(c => true).CountDocumentsAsync());

            var chars = (from c in db.Characters.AsQueryable() select c).ToList();
            var players = (from c in db.Players.AsQueryable() select c).ToList();
            Assert.Equal(chars.First().PlayerId, players.First().PlayerId);

            // This is how to do a join
            var qs = await db.Characters.Aggregate()
                .Match(i => i.Name == "Jerry")
                .Lookup(db.Players, i => i.PlayerId, i => i.PlayerId, (CharacterWithPlayers x) => x.Players)
                .ToListAsync();
            var qss = qs.Select(p => new CharacterWithPlayer(p))
                .Single();

            Assert.Equal("Jerry", qss.Name);
            Assert.Equal("Bob Dylan", qss.Player?.Name);
            Assert.NotEmpty(qss.Events);
        }


        [Fact]
        public async Task Player_Updates_Work()
        {
            await Seed();

            var playerId = await db.GetPlayerIdByEmail("Bob.Dylan@example.com", CancellationToken.None);
            Assert.NotNull(playerId);

            await db.UpdatePlayerProfile(playerId!, "Dylan Bob", "bdylan@example.com", new[] { "bobd@example.com" }, CancellationToken.None);

            Assert.Null(await db.GetPlayerIdByEmail("bob.dylan@example.com", CancellationToken.None));
            Assert.Equal(playerId, await db.GetPlayerIdByEmail("BDYLAN@example.com", CancellationToken.None));
            Assert.Equal(playerId, await db.GetPlayerIdByEmail("bobd@example.com", CancellationToken.None));
        }
    }
}

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Divergic.Logging.Xunit;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Mongo2Go;
using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using Mystwood.Landing.Data;
using Mystwood.Landing.Data.Mock;
using Mystwood.Landing.Data.Validators;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Xunit;
using Xunit.Abstractions;

namespace MystwoodDb.Tests
{
    public class Tests : IAsyncLifetime
    {
        private MystwoodDatabase db = null!;
        private readonly ITestOutputHelper output;
        private readonly ICacheLogger _logger;
        private MongoDbRunner? _mongo;

        public string? ConnectionString { get; private set; }

        public Tests(ITestOutputHelper output)
        {
            this.output = output;
            _logger = output.BuildLogger();
        }

        public async Task DisposeAsync()
        {
            await db.Connection.DropDatabaseAsync("mwlxunit");
            db.Dispose();
            db = null!;
            _mongo?.Dispose();
        }

        public Task InitializeAsync()
        {
            _mongo = MongoDbRunner.Start(logger: _logger, additionalMongodArguments: "--quiet");
            this.ConnectionString = _mongo.ConnectionString;
            var options = new OptionsWrapper<MystwoodDatabaseOptions>(new MystwoodDatabaseOptions()
            {
                ApplicationName = "MystwoodLanding.xunit",
                DatabaseName = "mwlxunit",
                ConnectionString = _mongo.ConnectionString
            });
            db = new MystwoodDatabase(options, Mock.Of<ILogger<MystwoodDatabase>>());

            return Task.CompletedTask;
        }

        protected async Task Seed()
        {
            static string id() => ObjectId.GenerateNewId().ToString();

            var event1 = new Event {EventId = id(), Name = "Event 1"};
            await db.Events.InsertOneAsync(event1);

            var event2 = new Event {EventId = id(), Name = "Event 2"};
            await db.Events.InsertOneAsync(event2);

            var event3 = new Event {EventId = id(), Name = "Event 3"};
            await db.Events.InsertOneAsync(event3);

            var player = new Player
            {
                PlayerId = id(),
                Name = "Bob Dylan",
                PrimaryEmail = "bob.dylan@example.com",
                NormalizedEmails = new[] {"bob.dylan@example.com".ToUpperInvariant()}
            };
            await db.Players.InsertOneAsync(player);

            var character1 = new Character
            {
                CharacterId = id(),
                PlayerId = player.PlayerId,
                Name = "Jerry",
                Events = new[] {new EventParticipation {EventId = event1.EventId, Participated = true}}
            };
            await db.Characters.InsertOneAsync(character1);

            var character2 = new Character
            {
                CharacterId = id(),
                PlayerId = player.PlayerId,
                Name = "Marge",
                Events = new[]
                {
                    new EventParticipation {EventId = event1.EventId, Participated = true},
                    new EventParticipation {EventId = event2.EventId, Participated = true},
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

            await db.UpdatePlayerProfile(playerId!, "Dylan Bob", "bdylan@example.com", new[] {"bobd@example.com"},
                CancellationToken.None);

            Assert.Null(await db.GetPlayerIdByEmail("bob.dylan@example.com", CancellationToken.None));
            Assert.Equal(playerId, await db.GetPlayerIdByEmail("BDYLAN@example.com", CancellationToken.None));
            Assert.Equal(playerId, await db.GetPlayerIdByEmail("bobd@example.com", CancellationToken.None));
        }

        [Fact]
        public async Task Seeding_Works()
        {
            var seeder = new MystwoodDatabaseSeeder(db);
            await seeder.SeedReferenceData();

            Assert.Equal(10, await db.Traits.Find(c => c.Type == TraitType.Ability).CountDocumentsAsync());
            Assert.Equal(32, await db.Traits.Find(c => c.Type == TraitType.Advantage).CountDocumentsAsync());
            Assert.Equal(1, await db.Traits.Find(c => c.Type == TraitType.CraftSkill).CountDocumentsAsync());
            Assert.Equal(33, await db.Traits.Find(c => c.Type == TraitType.Disadvantage).CountDocumentsAsync());
            Assert.Equal(10, await db.Traits.Find(c => c.Type == TraitType.Gift).CountDocumentsAsync());
            Assert.Equal(0, await db.Traits.Find(c => c.Type == TraitType.Homeland).CountDocumentsAsync());
            Assert.Equal(104, await db.Traits.Find(c => c.Type == TraitType.Occupation).CountDocumentsAsync());
            Assert.Equal(0, await db.Traits.Find(c => c.Type == TraitType.Religion).CountDocumentsAsync());
            Assert.Equal(109, await db.Traits.Find(c => c.Type == TraitType.Skill).CountDocumentsAsync());
            Assert.Equal(12, await db.Traits.Find(c => c.Type == TraitType.FlavorTrait).CountDocumentsAsync());
        }

        [Fact]
        public void Calculate_Level_Cost()
        {
            Assert.Equal(0, Constants.LevelCost(6, 2)); // Negatives not possible

            Assert.Equal(0, Constants.LevelCost(6, 6)); // All free levels
            Assert.Equal(7, Constants.LevelCost(6, 7)); // One purchased level
            Assert.Equal(15, Constants.LevelCost(6, 8)); // Two purchased levels
            Assert.Equal(34, Constants.LevelCost(6, 10)); // Four purchased levels
        }


        [Fact]
        public async Task Validator_Works()
        {
            var seeder = new MystwoodDatabaseSeeder(db);
            await seeder.SeedReferenceData();

            var playerBuilder = PlayerBuilder.Create("Will");
            playerBuilder.WithEmails("will@larptheseries.com")
                .WithCharacter("Biff", ch => ch
                    .WithGift("Courage", TraitAssociationType.Free, TraitAssociationType.Free,
                        TraitAssociationType.Free, TraitAssociationType.Free, TraitAssociationType.Free,
                        TraitAssociationType.Free, TraitAssociationType.Purchased)
                    .WithPublicHistory("Once upon a time, there was man, he died, the end.")
                );

            await playerBuilder.Write(db);

            var validator = new CharacterValidator(db, NullLoggerFactory.Instance.CreateLogger<CharacterValidator>());
            var character = await db.Characters.Find(i => i.Name == "Biff").FirstAsync();
            Assert.NotNull(character);

            var result = await validator.ValidateAsync(character);
            output.WriteLine(result.ToString());

            Assert.True(result.IsSuccessful);
        }
    }
}

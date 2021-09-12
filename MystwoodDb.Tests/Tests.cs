﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Mongo2Go;
using MongoDB.Driver;
using Mystwood.Landing.Data;
using Xunit;

namespace MystwoodDb.Tests
{
    public class Tests : IAsyncLifetime
    {
        private MystwoodDatabase db;

        public Task DisposeAsync()
        {
            return Task.CompletedTask;
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
            db = new MystwoodDatabase(options);

            return Task.CompletedTask;
        }

        protected async Task Seed()
        {
            static string id() => Guid.NewGuid().ToString("N").Substring(0, 24);

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
                Email = "bob.dylan@example.com"
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
        public async Task Test1()
        {
            await Seed();

            Assert.Equal(2, await db.Characters.EstimatedDocumentCountAsync());
            Assert.Equal(1, await db.Players.EstimatedDocumentCountAsync());
            Assert.Equal(3, await db.Events.EstimatedDocumentCountAsync());

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
            Assert.Equal("Bob Dylan", qss.Player.Name);
            Assert.NotEmpty(qss.Events);
        }
    }
}

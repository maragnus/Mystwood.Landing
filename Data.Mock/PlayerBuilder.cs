using MongoDB.Bson;
using MongoDB.Driver;

namespace Mystwood.Landing.Data.Mock
{
    public class PlayerBuilder : BaseBuilder
    {
        private readonly string _name;
        private string[] _emails = Array.Empty<string>();
        private readonly List<CharacterBuilder> _characters = new();
        private readonly List<EventParticipation> _events = new();

        public string PlayerId { get; } = ObjectId.GenerateNewId().ToString();

        protected PlayerBuilder(string name) => this._name = name;

        public static PlayerBuilder Create(string name) =>
            new PlayerBuilder(name);

        public PlayerBuilder WithCharacter(string name, Action<CharacterBuilder> builder)
        {
            var b = new CharacterBuilder(this, name);
            builder(b);
            _characters.Add(b);
            return this;
        }

        public PlayerBuilder WithEmails(params string[] emails)
        {
            _emails = emails.ToArray();
            return this;
        }

        public Player Build() => new()
        {
            PlayerId = PlayerId,
            Name = _name,
            PrimaryEmail = _emails.FirstOrDefault(),
            Emails = _emails.Skip(1).ToArray(),
            NormalizedEmails = _emails.Select(i => i.ToUpperInvariant()).ToArray(),
            Events = _events.ToArray()
        };

        public async Task Write(MystwoodDatabase db)
        {
            await db.Players.InsertOneAsync(Build());
            var traitLookup = await CharacterBuilder.GetTraitLookup(db);

            foreach (var characterBuilder in _characters)
            {
                var character = characterBuilder.Build(traitLookup);
                await db.Characters.InsertOneAsync(character);
            }
        }
    }
}

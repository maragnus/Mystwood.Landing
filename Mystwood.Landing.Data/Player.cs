using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public record Player
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string PlayerId;

        public string Name;
        public string Email;
    }

    public record PlayerWithCharacters : Player
    {
        public IEnumerable<Character> Characters;
    }
}

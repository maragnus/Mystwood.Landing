using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public record Trait
    {
        public TraitType Type;
        public string Name;
        public string Description;
    }

    public record Occupation : Trait
    {
        public Occupation() { Type = TraitType.Occupation; }
        public OccupationType OccupationType;
        public OccupationSkill[] Skills;
        public string Requirement;
    }

    public record OccupationSkill
    {
        public string[] Skill; // One of
    }

    public enum TraitType
    {
        Gift,
        Religion,
        Homeland,
        Occupation,
        OccupationalEnhancement,
        Trait,
        Skill,
        Advantage,
        Disadvantage
    }

    public enum OccupationType
    {
        Basic,
        Youth,
        Advanced,
        Plot,
        Enhancement
    }

    public enum SkillType
    {
        Ordinary,
        Craft
    }

    public record CharacterSummary
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CharacterId;
        [BsonRepresentation(BsonType.ObjectId)]
        public string PlayerId;

        public string Name;

        public int Level;

        public string Occupation;

        public string OccupationalEnhancement;

        public string Religion;

        public string Homeland;
    }

    public record Character : CharacterSummary
    {
        public EventParticipation[] Events;

        public Gifts Gifts;

        public string[] Advantages;

        public string[] Disadvantages;

        public string[] Skills;

        public string[] PurchasedSkills;

        public string[] Spells;

        public string[] Cures;

        public string[] Documents;

        public string[] UnusualFeatures;

        public string PublicHistory;

        public string PrivateHistory;
    }

    public record Gifts
    {
        public int Courage;
        public int Dexterity;
        public int Empathy;
        public int Passion;
        public int Prowess;
        public int Wisdom;
    }

    /// <summary>
    /// Intermediate class for Aggregates with Player
    /// </summary>
    public record CharacterWithPlayers : Character
    {
        public IEnumerable<Player> Players;
    }

    /// <summary>
    /// Resulting Projection for Aggregate with Player
    /// </summary>
    public record CharacterWithPlayer : Character
    {
        public CharacterWithPlayer() { }

        public CharacterWithPlayer(Character c) : base(c) { }

        public CharacterWithPlayer(CharacterWithPlayer cwp) : base(cwp) =>
            Player = cwp.Player;

        public CharacterWithPlayer(CharacterWithPlayers cwps) : base(cwps) =>
            Player = cwps.Players.FirstOrDefault();

        public Player Player;
    }

}

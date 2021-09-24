using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public enum TraitAssociationType
    {
        Free, // Trait that is free to all players
        Elected, // Trait that is chosen
        Referenced, // Trait that is referenced by another trait
        Purchased // Trait that is purchased with moonstone
    }

    public record TraitAssociation
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? TraitId;

        public TraitAssociationType Type;

        [BsonIgnoreIfDefault]
        public int? Level;
    }

    public record Trait
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId, BsonIgnoreIfDefault]
        public string? TraitId;

        public TraitType Type;

        public string? Name;

        public string? Description;

        [BsonRepresentation(BsonType.ObjectId)]
        public string[]? Requirements;
    }

    public record TraitSummary
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId, BsonIgnoreIfDefault]
        public string? TraitId;

        public TraitType Type;

        public string? Name;

        [BsonRepresentation(BsonType.ObjectId)]
        public string[]? Requirements;
    }


    public record OccupationTrait : Trait
    {
        public OccupationTrait() { Type = TraitType.Occupation; }

        public OccupationType OccupationType;

        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Skills = Array.Empty<string>();

        public string? Requirement;
    }

    public record SkillTrait : Trait
    {
        public SkillTrait() { Type = TraitType.Skill; }

        public string SkillType = "Unavailable";
        public int? Cost;
        public string? Occurrence;
    }

    public record AbilityTrait : Trait
    {
        public AbilityTrait() { Type = TraitType.Ability; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? GiftId;
    }

    public record GiftTrait : Trait
    {
        public GiftTrait() { Type = TraitType.Gift; }

        [BsonRepresentation(BsonType.ObjectId)]
        public int Cost;
    }

    public record OccupationSkill : Trait
    {
        public OccupationSkill() { Type = TraitType.Occupation; }

        public string[] Skill = Array.Empty<string>(); // One of
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
        Disadvantage,
        Ability
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

}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mystwood.Landing.Data
{
    public enum TraitAssociationType
    {
        Free, // Trait that is free to all players, Townsfolk, or first 6 Gifts
        Elected, // Trait that is chosen as one of several options
        Referenced, // Trait that is referenced by another trait
        Purchased, // Trait that is purchased with moonstone
        Talent, // Trait granted by Talent advantage
    }

    public record TraitAssociation
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? TraitId;

        public TraitAssociationType Type;

        [BsonIgnoreIfNull]
        public int? SkillTokens;

        [BsonIgnoreIfNull]
        public int? Moonstone;

        [BsonIgnoreIfNull]
        public int? Rank; // This indicates the X in the Skill name

        [BsonIgnoreIfNull]
        public string? Specified; // This indicates the specific type, such as "watch" in "Duty (watch)"
    }

    public record TraitSummary
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId, BsonIgnoreIfDefault]
        public string? TraitId;

        public TraitType Type;

        public string? Name;

        public string? GroupName; // Used for grouping multiple levels of the same trait

        public int GroupRank = 1;
    }

    public record Trait : TraitSummary
    {
        public string? Description;
    }

    public record FlavorTrait : Trait
    {
        public FlavorTrait() { Type = TraitType.FlavorTrait; }
    }

    public record AdvantageTrait : Trait
    {
        public AdvantageTrait() { Type = TraitType.Advantage; }
        public bool IsPhysical = false;

    }

    public record DisadvantageTrait : Trait
    {
        public DisadvantageTrait() { Type = TraitType.Disadvantage; }
        public bool IsPhysical = false;
    }

    public record OccupationTrait : Trait
    {
        public OccupationTrait() { Type = TraitType.Occupation; }

        public OccupationType OccupationType;

        public string[] Skills = Array.Empty<string>();

        public string? Requirement;
    }

    public record SkillTrait : Trait
    {
        public SkillTrait() { Type = TraitType.Skill; }

        public int? Cost;
        public SkillRank? Rank;
        public SkillClass SkillClass;
    }

    public record CraftSkillTrait : Trait
    {
        public CraftSkillTrait() { Type = TraitType.CraftSkill; }

        public CraftArea CraftArea;
        public int? Cost;
        public SkillRank? Rank;
        public CraftType CraftType;
        public string? Components;
    }


    public record AbilityTrait : Trait
    {
        public AbilityTrait() { Type = TraitType.Ability; }
    }

    public record GiftTrait : Trait
    {
        public GiftTrait() { Type = TraitType.Gift; }

        public int Cost;

        public string[] Abilities = Array.Empty<string>();

        public GiftProperty[] Properties = Array.Empty<GiftProperty>();
    }

    public record OccupationSkill : Trait
    {
        public OccupationSkill() { Type = TraitType.Occupation; }

        public string[] Skill = Array.Empty<string>(); // One of
    }

    public record GiftProperty
    {
        public GiftProperty(string name, string? value)
        {
            Name = name;
            Value = value;
        }

        public string Name;
        public string? Value;
    }

    public enum TraitType
    {
        Gift,
        Religion,
        Homeland,
        Occupation,
        FlavorTrait,
        Skill,
        Advantage,
        Disadvantage,
        Ability,
        CraftSkill,
        Unspecified
    }

    public enum OccupationType
    {
        Basic,
        Youth,
        Advanced,
        Plot,
        Enhancement
    }

    public enum CraftArea
    {
        Apothecary,
        Medicine,
        Armstraining,
        BardicVoice,
        Cooking,
        Metalworking,
        Poisoner,
        Scribe,
        Sewing,
        Woodworking
    }

    public enum SkillClass
    {
        Free,
        Minor,
        Standard,
        Major,
        Unavailable
    }

    public enum SkillRank
    {
        Once,
        Multiple
    }

    public enum CraftType
    {
        None,
        Special,
        Enhancement,
        CraftKit,
        Immediate
    }

}

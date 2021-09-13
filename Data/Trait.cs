using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Mystwood.Landing.Data
{
    public record Trait
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId TraitId = ObjectId.GenerateNewId();

        public TraitType Type;
        public string? Name;
        public string? Description;
    }


    public record Occupation : Trait
    {
        public Occupation() { Type = TraitType.Occupation; }
        public OccupationType OccupationType;
        public OccupationSkill[] Skills = Array.Empty<OccupationSkill>();
        public string? Requirement;
    }

    public record OccupationSkill
    {
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

}

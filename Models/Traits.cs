namespace Mystwood.Landing.Models
{
    public enum SkillAssociationType
    {
        Free,
        Occupation,
        Purchased
    }

    public enum SkillClass
    {
        Free,
        Minor,
        Standard,
        Major,
        Unavailable
    }

    public enum SkillOccurrence
    {
        Once,
        Multiple
    }

    public record Gift(string Name, string[] PropertyNames, GiftRank[] GiftRanks);

    public record GiftRank(int Rank, string[] PropertyValues, string[]? Abilities);

    public record Skill(string Name, SkillClass Class, SkillOccurrence? Occurrence, int? Cost);

    public record Advantage(string Name, string Group, int Rank, bool IsPhysical);

    public record Disadvantage(string Name, string Group, int Rank, bool IsPhysical);
}

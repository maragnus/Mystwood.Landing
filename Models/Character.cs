namespace Mystwood.Landing.Models
{
    public record SkillAssociation(string Name, int? Rank, SkillAssociationType AssociationType, int? Moonstone,
        int? SkillToken);

    public class Character
    {
        public string Name { get; set; } = "";
        public int Courage { get; set; }
        public int Dexterity { get; set; }
        public int Empathy { get; set; }
        public int Prowess { get; set; }
        public int Passion { get; set; }
        public int Wisdom { get; set; }
        public string Occupation { get; set; } = "";
        public string Enhancement { get; set; } = "";
        public string HomeChapter { get; set; } = "";
        public string PublicStory { get; set; } = "";
        public string PrivateStory { get; set; } = "";
        public string UnusualFeatures { get; set; } = "";
        public string Cures { get; set; } = "";
        public string Documents { get; set; } = "";
        public string Notes { get; set; } = "";
        public List<string> Religions { get; } = new();
        public List<string> Advantages { get; } = new();
        public List<string> Disadvantages { get; } = new();
        //public List<SkillAssociation> Skills { get; } = new();
    }
}

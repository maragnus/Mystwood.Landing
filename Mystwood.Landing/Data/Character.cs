using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public enum CharacterState
{
    Unknown,
    Live,
    Review,
    Draft,
    Archived
}


public class Character
{
    [Required, Key]
    public Guid? Id { get; set; }

    public string? Name { get; set; }

    public string? Metadata { get; set; }

    public DateTimeOffset? CreatedOn { get; set; }

    public ICollection<CharacterRevision> CharacterRevisions { get; set; } = new List<CharacterRevision>();
}

public class CharacterRevision
{
    [Required, Key]
    public Guid? Id { get; set; }

    [Required]
    public Guid? CharacterId { get; set; }

    public DateTimeOffset? CreatedOn { get; set; }
    public CharacterState State { get; set; }
    public string? Json { get; set; }

    public Character? Character { get; set; }
}

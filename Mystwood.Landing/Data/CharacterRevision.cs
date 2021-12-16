using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public class CharacterRevision
{
    [Required, Key]
    public Guid? Id { get; set; }

    [Required]
    public Guid? CharacterId { get; set; }

    public DateTimeOffset? CreatedOn { get; set; }
    public RevisionState State { get; set; }
    public string? Json { get; set; }

    public virtual Character? Character { get; set; }
    public virtual ICollection<CharacterRevisionEvent> CharacterRevisionEvents { get; set; } = new List<CharacterRevisionEvent>();
}



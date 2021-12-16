using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public class CharacterRevisionEvent
{
    [Required, Key]
    public Guid? Id { get; set; }

    [Required]
    public Guid? CharacterRevisionId { get; set; }
    public RevisionState State { get; set; }
    public DateTimeOffset? ChangedOn { get; set; }

    public virtual CharacterRevision? CharacterRevision { get; set; }
}



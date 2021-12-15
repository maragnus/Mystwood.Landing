using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public enum RevisionState
{
    Unknown,    // This is an invalid state
    Live,       // One revision will have this state, unless this is a New character
                // One revision will can be either Review or Draft
    Review,     //  - Prepared for a game master approval
    Draft,      //  - Player is currently drafting a new change
    Archived    // Once Review is approved, previous Live moves to Archive, new Review moves to Live
}

// Flow: New -> Draft -> Review -> Live -> Archive
// Cancel Review: Review -> Draft

public class Character
{
    [Required, Key]
    public Guid? Id { get; set; }

    [Required]
    public int? AccountId { get; set; }

    public string? Name { get; set; }

    public string? Metadata { get; set; }

    public DateTimeOffset? CreatedOn { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<CharacterRevision> CharacterRevisions { get; set; } = new List<CharacterRevision>();

    public virtual ICollection<CharacterAttendance> CharacterAttendances { get; set; } = new HashSet<CharacterAttendance>();
}

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



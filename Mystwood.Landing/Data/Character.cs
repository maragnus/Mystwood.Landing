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

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<CharacterRevision> CharacterRevisions { get; set; } = new List<CharacterRevision>();

    public virtual ICollection<CharacterAttendance> CharacterAttendances { get; set; } = new HashSet<CharacterAttendance>();
}



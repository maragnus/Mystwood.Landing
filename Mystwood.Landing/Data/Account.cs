using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public class Account
{
    [Key, Required]
    public int? Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    public string? Location { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Notes { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? Metadata { get; set; }

    [Required]
    public bool? IsAdmin { get; set; }

    [Required]
    public bool? IsValid { get; set; }

    [Required]
    public DateTimeOffset? Created { get; set; }

    public virtual ICollection<EmailAddress> EmailAddresses { get; set; } = new HashSet<EmailAddress>();

    public virtual ICollection<Session> Sessions { get; set; } = new HashSet<Session>();

    public virtual ICollection<Character> Characters { get; set; } = new HashSet<Character>();

    public virtual ICollection<AccountAttendance> PlayerAttendances { get; set; } = new HashSet<AccountAttendance>();
}

public enum EventType
{
    Game,
    Maintenance,
    Other
}

public class Event
{
    [Key]
    public int? Id { get; set; }

    [Required]
    public string? Title { get; set; }

    public string? Location { get; set; }

    public DateTime? EventDate { get; set; }

    [Required]
    public EventType? EventType { get; set; }

    [Required]
    public bool? Rsvp { get; set; }

    public ICollection<CharacterAttendance> CharacterAttendances { get; set; } = new HashSet<CharacterAttendance>();
}

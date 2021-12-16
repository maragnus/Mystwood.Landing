using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public enum EventType
{
    Other,
    Game,
    Maintenance
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

using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public class AccountAttendance
{
    [Key]
    public int? Id { get; set; }

    [Required]
    public int? AccountId { get; set; }

    [Required]
    public int? EventId { get; set; }

    [Required]
    public string? Rsvp { get; set; }

    [Required]
    public int? Moonstone { get; set; }

    public string? Notes { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;
}

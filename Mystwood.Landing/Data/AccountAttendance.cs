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

    public virtual ICollection<AccountAttendanceUpdate> AccountAttendanceUpdates { get; set; } = new HashSet<AccountAttendanceUpdate>();
}

public class AccountAttendanceUpdate
{
    [Key]
    public int? Id { get; set; }

    [Required]
    public int? AccountAttendanceId { get; set; }

    [Required]
    public string? Rsvp { get; set; }

    [Required]
    public int? UpdatedByAccountId { get; set; }

    [Required]
    public DateTimeOffset? UpdatedOn { get; set; }

    public virtual AccountAttendance AccountAttendance { get; set; } = null!;

    public virtual Account UpdatedByAccount { get; set; } = null!;
}

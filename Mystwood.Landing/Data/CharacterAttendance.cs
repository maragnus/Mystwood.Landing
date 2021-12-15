using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public class CharacterAttendance
{
    [Key]
    public int? Id { get; set; }

    [Required]
    public Guid? CharacterId { get; set; }

    [Required]
    public int? EventId { get; set; }

    public virtual Character Character { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;
}

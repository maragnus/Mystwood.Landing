using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mystwood.Landing.Data;

public class Session
{
    [Required, Key]
    public string Id { get; set; } = null!;

    [Required]
    public int? AccountId { get; set; } = null;

    public DateTimeOffset? Created { get; set; }

    [ForeignKey(nameof(AccountId))]
    public Account Account { get; set; } = null!;

    public DateTimeOffset? Accessed { get; set; }
}

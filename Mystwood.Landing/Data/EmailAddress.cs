using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mystwood.Landing.Data;

public class EmailAddress
{
    [Key, Required]
    public int? Id { get; set; }

    [Required]
    public int? AccountId { get; set; }

    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string EmailNormalized { get; set; } = null!;

    [ForeignKey(nameof(AccountId))]
    public Account Account { get; set; } = null!;
}

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

    [Required]
    public bool? IsAdmin { get; set; }

    [Required]
    public bool? IsValid { get; set; }

    [Required]
    public DateTimeOffset? Created { get; set; }

    public ICollection<EmailAddress>? EmailAddresses { get; set; }

    public ICollection<Session>? Sessions { get; set; }
}

using System.ComponentModel.DataAnnotations;

namespace Mystwood.Landing.Data;

public class Token
{
    [Required, Key]
    public int? Id { get; set; }

    [Required]
    public string? Code { get; set; }

    [Required]
    public string? Source { get; set; }

    [Required]
    public DateTimeOffset? Created { get; set; }

    [Required]
    public DateTimeOffset? Expires { get; set; }

    public DateTimeOffset? Consumed { get; internal set; }

    public string? CreatedEndPoint { get; internal set; }

    public string? ConsumedEndPoint { get; internal set; }

}

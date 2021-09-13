namespace Mystwood.Landing.MwlApi.Authorization;

public record ApplicationUser
{
    public string? UserName { get; set; }
    public string? PlayerId { get; set; }
}

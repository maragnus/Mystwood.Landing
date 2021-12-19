namespace Mystwood.Landing;

public class GoogleOptions
{
    public const string SectionName = "Google";

    public string? MapsApiKey { get; set; }
    public string? SheetsApiKey { get; set; }
    public string? ApplicationName { get; set; }
    public string? SpreadsheetId { get; set; }
    public string? AuthTokenPath { get; set; }
    public string? UserName { get; set; }
}

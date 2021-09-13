namespace Mystwood.Landing.Common;

public class MessagingServiceOptions
{
    public const string SectionName = "Messaging";

    public string? SmtpServer { get; set; }
    public int? SmtpPort { get; set; }
    public string? SmtpUserName { get; set; }
    public string? SmtpPassword { get; set; }
    public bool SmtpUserSsl { get; set; } = false;
    public Dictionary<string, string> Froms { get; set; } = new Dictionary<string, string>();
}

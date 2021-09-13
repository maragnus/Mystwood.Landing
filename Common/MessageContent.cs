namespace Mystwood.Landing.Common;

public class MessageContent
{
    public string? TextBody { get; set; }
    public string? HtmlBody { get; set; }

    public IReadOnlyList<Attachment> Attachments =>
        (IReadOnlyList<Attachment>?)_attachments ?? Array.Empty<Attachment>();

    private List<Attachment>? _attachments;

    public record Attachment
    {
        public string Name = null!;
        internal byte[] Bytes = Array.Empty<byte>();
    }

    public void AddAttachment(string fileName, byte[] bytes)
    {
        _attachments ??= new List<Attachment>(1);
        _attachments.Add(new Attachment { Name = fileName, Bytes = bytes });
    }
}

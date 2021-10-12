using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using Mystwood.Landing.Common;

namespace Mystwood.Landing.Common;

public interface IMessagingService
{
    Task SendEmail(string from, string recipient, string subject, string? textBody, string? htmlBody);

    Task SendEmail(string from, string recipient, string subject, MessageContent content);

    Task SendSms(string from, string recipient, string body);
}

public class MessagingService : IMessagingService
{
    private MessagingServiceOptions _options;

    public MessagingService(IOptions<MessagingServiceOptions> options)
    {
        _options = options.Value;
    }

    public Task SendEmail(string from, string recipient, string subject, string? textBody, string? htmlBody) =>
        SendEmail(from, recipient, subject, new MessageContent
        {
            HtmlBody = htmlBody,
            TextBody = textBody
        });

    public async Task SendEmail(string from, string recipient, string subject, MessageContent content)
    {
        if (!_options.Froms.TryGetValue(from, out var fromAddress))
            throw new MessagingServiceException($"{nameof(MessagingServiceOptions.Froms)} in {MessagingServiceOptions.SectionName} Section does not include mapping for '{from}' address.");

        var port = _options.SmtpPort ?? (_options.SmtpUserSsl ? 587 : 25);
        using var smtpClient = new SmtpClient();
        await smtpClient.ConnectAsync(_options.SmtpServer, port, _options.SmtpUserSsl);

        var body = new BodyBuilder()
        {
            HtmlBody = content.HtmlBody,
            TextBody = content.TextBody
        };
        foreach (var attachment in content.Attachments)
            body.Attachments.Add(attachment.Name, attachment.Bytes);

        var message = new MimeMessage();
        message.From.Add(InternetAddress.Parse(fromAddress));
        message.To.Add(InternetAddress.Parse(recipient));
        message.Subject = subject;
        message.Body = body.ToMessageBody();

        await smtpClient.SendAsync(message);

        await smtpClient.DisconnectAsync(true);
    }

    public Task SendSms(string from, string recipient, string body) => throw new NotImplementedException();
}

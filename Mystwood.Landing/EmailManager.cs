using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace Mystwood.Landing
{
    public interface IEmailManager
    {
        Task SendEmail(string recipient, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default);
    }

    public class SmtpOptions
    {
        public const string SectionName = "Smtp";
        public string? FromAddress { get; set; }
        public string? Host { get; set; }
        public int Port { get; set; }
        public bool UseSsl { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }

    public class EmailManager : IEmailManager
    {
        private SmtpOptions _options;

        public EmailManager(IOptions<SmtpOptions> options)
        {
            _options = options.Value;
        }

        public async Task SendEmail(string recipient, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(_options.Host, _options.Port, _options.UseSsl, cancellationToken);
            if (!string.IsNullOrEmpty(_options.UserName))
                await client.AuthenticateAsync(_options.UserName, _options.Password, cancellationToken);
            var message = new MimeMessage();
            message.From.Add(InternetAddress.Parse(_options.FromAddress!));
            message.To.Add(InternetAddress.Parse(recipient));
            message.Subject = subject;
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = htmlBody
            };
            await client.SendAsync(message, cancellationToken);
        }
    }
}
using System.Net.Sockets;
using Microsoft.Extensions.Options;
using Mystwood.Landing.Common;
using Xunit;

namespace Mystwood.Landing.Tests.CommonTests;
public class MessagingServiceTests
{
    [Fact]
    public async Task SmtpTestAsync()
    {
        var options = new MessagingServiceOptions()
        {
            SmtpServer = "localhost",
            SmtpPort = 19923,
            SmtpUserSsl = false,
            Froms = new Dictionary<string, string> { { "noreply", "landing@mystwood.org" } }
        };
        var service = new MessagingService(new OptionsWrapper<MessagingServiceOptions>(options));

        await Assert.ThrowsAsync<MessagingServiceException>(async () =>
        {
            await service.SendEmail("invalid@mystwood.org", "acrion@gmail.com", "Mystwood Landing Account", "Welcome to Mystwood Landing", null);
        });

        await Assert.ThrowsAsync<SocketException>(async () =>
        {
            await service.SendEmail("noreply", "acrion@gmail.com", "Mystwood Landing Account", "Welcome to Mystwood Landing", null);
        });
    }
}

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
            SmtpUserSsl = false
        };

        var service = new MessagingService(new OptionsWrapper<MessagingServiceOptions>(options));
        await service.SendEmail("landing@mystwood.org", "acrion@gmail.com", "Mystwood Landing Account", "Welcome to Mystwood Landing", null);
    }
}

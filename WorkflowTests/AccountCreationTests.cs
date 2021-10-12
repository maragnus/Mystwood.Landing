using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Mongo2Go;
using Moq;
using Mystwood.Landing.Common;
using Mystwood.Landing.Data;
using Mystwood.Landing.Tests.Common;
using Xunit;

namespace Mystwood.Landing.WorkflowTests
{
    public class IntegrationTestBase : IAsyncLifetime
    {
        protected IServiceProvider ServiceProvider { get; private set; } = null!;

        public virtual Task InitializeAsync()
        {
            var services = new ServiceCollection();

            services.AddSingleton<ISystemClock, TimeTravelClock>();

            // MessagingService as expected
            var messagingService = new Mock<IMessagingService>();
            messagingService.Setup(x => x.SendEmail("NoReply", It.IsAny<string>(), It.IsAny<string>(), It.IsAny<MessageContent>())).Returns(Task.CompletedTask);
            messagingService.Setup(x => x.SendEmail("NoReply", It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<string?>())).Returns(Task.CompletedTask);
            messagingService.Setup(x => x.SendSms(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ThrowsAsync(new NotImplementedException());
            services.AddSingleton(messagingService.Object);

            // Boot up MongoDb emulator
            var mongo = MongoDbRunner.Start();
            var databaseOptions = new OptionsWrapper<MystwoodDatabaseOptions>(new MystwoodDatabaseOptions()
            {
                ApplicationName = "MystwoodLanding.xunit",
                DatabaseName = "mwle2e",
                ConnectionString = mongo.ConnectionString
            });
            var db = new MystwoodDatabase(databaseOptions, Mock.Of<ILogger<MystwoodDatabase>>());
            services.AddSingleton<IMystwoodDatabase>(db);

            RegisterServices(services);

            ServiceProvider = services.BuildServiceProvider();

            return Task.CompletedTask;
        }

        public virtual void RegisterServices(ServiceCollection services)
        {
        }

        public Task DisposeAsync()
        {
            return Task.CompletedTask;
        }
    }


    public class AccountCreationTests : IntegrationTestBase
    {
        [Fact]
        public void Should_Register_Account()
        {

        }

    }
}

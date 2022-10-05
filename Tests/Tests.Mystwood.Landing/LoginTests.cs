using System;
using System.Buffers;
using System.Collections.Concurrent;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Logging;
using MimeKit;
using Mystwood.Landing;
using Mystwood.Landing.Data;
using Mystwood.Landing.GrpcLarp;
using Mystwood.Landing.LarpServices;
using NUnit.Framework;
using SmtpServer.Net;
using SmtpServer.Protocol;
using SmtpServer.Storage;
using Account = Mystwood.Landing.GrpcLarp.Account;


namespace Tests.Mystwood.Landing;

public class TestMessageStore : MessageStore
{
    ConcurrentQueue<MimeMessage> Messages { get; } = new ConcurrentQueue<MimeMessage>();

    public MimeMessage? DequeueMessage() =>
        Messages.TryDequeue(out var message) ? message : null;

    public override async Task<SmtpResponse> SaveAsync(SmtpServer.ISessionContext context, SmtpServer.IMessageTransaction transaction, ReadOnlySequence<byte> buffer, CancellationToken cancellationToken)
    {
        await using var stream = new MemoryStream();

        var position = buffer.GetPosition(0);
        while (buffer.TryGet(ref position, out var memory))
            stream.Write(memory.Span);

        stream.Position = 0;

        var message = await MimeMessage.LoadAsync(stream, cancellationToken);

        Messages.Enqueue(message);

        return SmtpResponse.Ok;
    }
}

public class Tests
{
    private ChannelBase _channel = null!;
    private int _smtpPort = 0;
    private Task _smtpTask = null!;
    private CancellationTokenSource _testCancel = null!;
    private TestMessageStore _messageStore = null!;

    [SetUp]
    public async Task Setup()
    {
        _testCancel = new CancellationTokenSource();

        await SpinUpSmtpServer();

        await SpinUpGrpcServer();
    }

    private async Task SpinUpGrpcServer()
    {
        var builder = WebApplication.CreateBuilder();
        builder.WebHost.UseKestrel(o => o.Listen(IPAddress.Loopback, 0));
        builder.Services.AddLogging(builder => builder.AddNUnit().SetMinimumLevel(LogLevel.Trace));
        builder.Services.AddGrpc();
        builder.Services.AddOptions();
        builder.Services.AddSingleton<ISystemClock, SystemClock>();
        builder.Services.AddDbContext<ApplicationDbContext>(o =>
            o.UseInMemoryDatabase(TestContext.CurrentContext.Test.FullName));
        builder.Services.AddScoped<IUserManager, UserManager>();
        builder.Services.AddScoped<ITokenManager, TokenManager>();
        builder.Services.AddScoped<IEmailManager, EmailManager>();
        builder.Services.Configure<SmtpOptions>((options) =>
        {
            options.FromAddress = "noreply@sample.com";
            options.Host = "127.0.0.1";
            options.Port = _smtpPort;
            options.UseSsl = false;
        });
        var app = builder.Build();
        app.UseDeveloperExceptionPage();
        app.MapGrpcService<LarpAuthenticationService>();
        app.MapGrpcService<LarpAccountService>();
        app.MapGet("/", () => "gRPC only");
        await app.StartAsync();

        var address = app.Urls.First(x => x.StartsWith("http:"));
        var httpHandler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        };
        _channel = GrpcChannel.ForAddress(address, new GrpcChannelOptions { HttpHandler = httpHandler });
    }

    private class MessageStore : IMessageStore
    {
        public Task<SmtpResponse> SaveAsync(SmtpServer.ISessionContext context, SmtpServer.IMessageTransaction transaction, ReadOnlySequence<byte> buffer, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }

    private Task SpinUpSmtpServer()
    {
        _messageStore = new TestMessageStore();

        var elf = new EndpointListenerFactory();
        elf.EndpointStarted += (s, e) =>
            _smtpPort = ((IPEndPoint)e.LocalEndPoint).Port;

        var services = new ServiceCollection();
        services.AddSingleton<IMessageStore>(_messageStore);
        services.AddSingleton<IEndpointListenerFactory>(elf);
        services.AddLogging(builder => builder.AddNUnit());
        var smtpBuilder = new SmtpServer.SmtpServerOptionsBuilder()
            .Endpoint(new SmtpServer.EndpointDefinitionBuilder()
                .Endpoint(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 0))
                .IsSecure(false)
                .Build())
            .Build();
        var smtp = new SmtpServer.SmtpServer(smtpBuilder, services.BuildServiceProvider());
        _smtpTask = smtp.StartAsync(_testCancel.Token);

        return Task.CompletedTask;
    }

    [TearDown]
    public async Task TearDown()
    {
        _testCancel.Cancel();
        await _smtpTask;
    }

    [Test]
    public async Task LoginFlowWithEmail_Works()
    {
        var authClient = new LarpAuthentication.LarpAuthenticationClient(_channel);

        var initiateResponse = await authClient.InitiateLoginAsync(new InitiateLoginRequest { Email = "foo@bar.com" });
        Assert.AreEqual(ValidationResponseCode.Success, initiateResponse.StatusCode);

        var message = _messageStore.DequeueMessage()!;
        Assert.IsNotNull(message);
        var body = message.HtmlBody;

        var code = body.Substring(body.IndexOf(':') + 2, 6); // from email

        var confirmResponse = await authClient.ConfirmLoginAsync(new ConfirmLoginRequest { Code = code, Email = "foo@bar.com" });
        Assert.AreEqual(ValidationResponseCode.Success, confirmResponse.StatusCode);

        var sessionId = confirmResponse.Session.SessionId;

        var profile = new Account
        {
            Name = "Bob Dylan",
            Phone = "+1 000-555-1234",
            Location = "Albion"
        };
        profile.Emails.Add(new AccountEmail { Email = "foo1@bar.com" });
        profile.Emails.Add(new AccountEmail { Email = "foo2@bar.com" });

        var client = new LarpAccount.LarpAccountClient(_channel);

        await client.SetAccountNameAsync(new UpdateAccountRequest(new SessionIdentifier(sessionId), profile.Name));
        await client.SetAccountPhoneAsync(new UpdateAccountRequest(new SessionIdentifier(sessionId), profile.Phone));
        await client.SetAccountLocationAsync(new UpdateAccountRequest(new SessionIdentifier(sessionId), profile.Location));
        await client.AddAccountEmailAsync(new UpdateAccountRequest(new SessionIdentifier(sessionId), "foo1@bar.com"));
        await client.AddAccountEmailAsync(new UpdateAccountRequest(new SessionIdentifier(sessionId), "foo2@bar.com"));
        var profileResponse = await client.RemoveAccountEmailAsync(new UpdateAccountRequest(new SessionIdentifier(sessionId), "foo@bar.com"));

        Assert.AreEqual(profile.Name, profileResponse.Profile.Name);
        Assert.AreEqual(profile.Phone, profileResponse.Profile.Phone);
        Assert.AreEqual(profile.Emails[0], profileResponse.Profile.Emails[0]);
        Assert.AreEqual(profile.Emails[1], profileResponse.Profile.Emails[1]);

        var getAccountResponse = await client.GetAccountAsync(new BasicRequest
        {
            Session = new SessionIdentifier(sessionId)
        });

        Assert.AreEqual(profile.Name, getAccountResponse.Profile.Name);
        Assert.AreEqual(profile.Phone, getAccountResponse.Profile.Phone);
        Assert.AreEqual(profile.Emails[0], getAccountResponse.Profile.Emails[0]);
        Assert.AreEqual(profile.Emails[1], getAccountResponse.Profile.Emails[1]);
    }

    [Test]
    public async Task LoginFlowWithBadCode_DoesntWork()
    {
        var authClient = new LarpAuthentication.LarpAuthenticationClient(_channel);

        var initiateResponse = await authClient.InitiateLoginAsync(new InitiateLoginRequest { Email = "foo@bar.com" });
        Assert.AreEqual(ValidationResponseCode.Success, initiateResponse.StatusCode);

        var message = _messageStore.DequeueMessage()!;
        Assert.IsNotNull(message);

        var code = "Invalid Code";

        var confirmResponse = await authClient.ConfirmLoginAsync(new ConfirmLoginRequest { Code = code, Email = "foo@bar.com" });
        Assert.AreNotEqual(ValidationResponseCode.Success, confirmResponse.StatusCode);
    }


    [Test]
    public async Task LoginFlowWithBadSession_DoesntWork()
    {
        var authClient = new LarpAuthentication.LarpAuthenticationClient(_channel);

        var initiateResponse = await authClient.InitiateLoginAsync(new InitiateLoginRequest { Email = "foo@bar.com" });
        Assert.AreEqual(ValidationResponseCode.Success, initiateResponse.StatusCode);

        var message = _messageStore.DequeueMessage()!;
        Assert.IsNotNull(message);
        var body = message.HtmlBody;

        var code = body.Substring(body.IndexOf(':') + 2, 6); // from email

        var confirmResponse = await authClient.ConfirmLoginAsync(new ConfirmLoginRequest { Code = code, Email = "foo@bar.com" });
        Assert.AreEqual(ValidationResponseCode.Success, confirmResponse.StatusCode);

        var sessionId = "Bad Session Id";

        var client = new LarpAccount.LarpAccountClient(_channel);

        var ex = Assert.ThrowsAsync<RpcException>(async () =>
        {
            await client.GetAccountAsync(new BasicRequest
            {
                Session = new SessionIdentifier(sessionId)
            });
        });
    }
}

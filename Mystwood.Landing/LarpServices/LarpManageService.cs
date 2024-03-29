﻿using Grpc.Core;
using Microsoft.Extensions.Options;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.LarpServices;

public class LarpManageService : LarpManage.LarpManageBase
{
    private readonly ILogger<LarpAuthenticationService> _logger;
    private readonly AccountOptions _options;
    private readonly ITokenManager _tokenManager;
    private readonly IEmailManager _emailManager;
    private readonly IUserManager _userManager;
    private readonly ICharacterManager _characterManager;
    private readonly IEventManager _eventManager;
    private readonly IServiceProvider _serviceProvider;

    public LarpManageService(ILogger<LarpAuthenticationService> logger, IEmailManager emailManager, ITokenManager tokenManager, IOptions<AccountOptions> options, IUserManager userManager, ICharacterManager characterManager, IEventManager eventManager, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _emailManager = emailManager;
        _tokenManager = tokenManager;
        _options = options.Value;
        _userManager = userManager;
        _characterManager = characterManager;
        _eventManager = eventManager;
        _serviceProvider = serviceProvider;
    }

    public override async Task<AdminCommandResponse> AdminCommand(AdminCommandRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
           throw new Exception("Unauthorized");

        _logger.LogWarning("Admin executed command: {AdminCommandName}", request.Command);

        switch (request.Command)
        {
            case "import":
                var dataImporter = _serviceProvider.GetRequiredService<DataPorting.DataPorting>();
                await dataImporter.Import();
                return new AdminCommandResponse();
            case "export":
                var dataExporter = _serviceProvider.GetRequiredService<DataPorting.DataPorting>();
                await dataExporter.Import();
                return new AdminCommandResponse();
            default:
                throw new Exception($"Invalid admin command: {request.Command}");
        }
    }

    public override async Task<AccountResponse> GetAccount(GetAccountRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
           throw new Exception("Unauthorized");

        var account = await _userManager.GetAccount(request.AccountId);

        var response = new AccountResponse();
        response.Profile = account;
        return response;
    }

    public override async Task<AccountResponse> UpdateAccount(ManageAccountRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
           throw new Exception("Unauthorized");

        await _userManager.Set(request.Profile);

        var response = new AccountResponse();
        response.Profile = await _userManager.GetAccount(request.Profile.AccountId);
        return response;
    }

    public override async Task<SearchAccountsResponse> SearchAccounts(SearchAccountsRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var accounts = await _userManager.QueryAccounts(request.Query);

        var response = new SearchAccountsResponse();
        response.Profiles.AddRange(accounts);

        return response;
    }

    public override async Task<SearchCharactersResponse> SearchCharacters(SearchCharactersRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var characters = await _characterManager.QueryCharacters(request.Query);

        var response = new SearchCharactersResponse();
        response.Characters.AddRange(characters);

        return response;
    }

    public override async Task<AccountResponse> SetAdmin(SetAdminRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
          throw new Exception("Unauthorized");

        await _userManager.SetAdmin(request.AccountId, request.IsAdmin);

        return await LarpUtilities.CreateAccountResponse(_userManager, request.AccountId);
    }

    public override async Task<EventsResponse> GetEvents(BasicRequest request, ServerCallContext context)
    {
        var _ = await _userManager.VerifyAdminSessionId(request.Session.SessionId);

        var events = await _eventManager.GetEventsAdmin();

        var response = new EventsResponse();
        response.Events.AddRange(events);

        return response;
    }

    public override async Task<EventResponse> AddEvent(EventRequest request, ServerCallContext context)
    {
        var e = await _eventManager.AddOrUpdateEvent(request.Event);

        return new EventResponse { Event = e };
    }

    public override async Task<EventResponse> UpdateEvent(EventRequest request, ServerCallContext context)
    {
        var e = await _eventManager.AddOrUpdateEvent(request.Event);

        return new EventResponse { Event = e };
    }

    public override async Task<NoResponse> SetRsvp(RsvpRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
          throw new Exception("Unauthorized");

        var rsvp = await _eventManager.GetRsvp(request.EventId, accountId);
        if (rsvp == null)
            throw new Exception("Event not found");

        await _eventManager.SetRsvp(request.EventId, request.AccountId, request.Rsvp, accountId);

        return new NoResponse();
    }
}

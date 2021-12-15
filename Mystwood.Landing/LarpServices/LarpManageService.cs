using Grpc.Core;
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

    public LarpManageService(ILogger<LarpAuthenticationService> logger, IEmailManager emailManager, ITokenManager tokenManager, IOptions<AccountOptions> options, IUserManager userManager, ICharacterManager characterManager)
    {
        _logger = logger;
        _emailManager = emailManager;
        _tokenManager = tokenManager;
        _options = options.Value;
        _userManager = userManager;
        _characterManager = characterManager;
    }

    public override async Task<AccountResponse> GetAccount(GetAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
           throw new Exception("Unauthorized");

        var account = await _userManager.GetAccount(request.AccountId);

        var response = new AccountResponse();
        response.Profile = account;
        return response;
    }

    public override async Task<SearchAccountsResponse> SearchAccounts(SearchAccountsRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var accounts = await _userManager.QueryAccounts(request.Query);

        var response = new SearchAccountsResponse();
        response.Profiles.AddRange(accounts);

        return response;
    }

    public override async Task<SearchCharactersResponse> SearchCharacters(SearchCharactersRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var characters = await _characterManager.QueryCharacters(request.Query);

        var response = new SearchCharactersResponse();
        response.Characters.AddRange(characters);

        return response;
    }

    public override async Task<AccountResponse> SetAdmin(SetAdminRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
          throw new Exception("Unauthorized");

        await _userManager.SetAdmin(request.AccountId, request.IsAdmin);

        return await LarpUtilities.CreateAccountResponse(_userManager, request.AccountId);
    }

    public override Task<EventResponse> AddEvent(AddEventRequest request, ServerCallContext context) => base.AddEvent(request, context);

    public override Task<EventResponse> UpdateEvent(UpdateEventRequest request, ServerCallContext context) => base.UpdateEvent(request, context);
}

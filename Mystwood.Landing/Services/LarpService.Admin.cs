using Grpc.Core;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.Services;

partial class LarpService
{
    public override async Task<GetAccountResponse> GetAccount(GetAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
           throw new Exception("Unauthorized");

        var account = await _userManager.GetAccount(request.AccountId);

        var response = new GetAccountResponse();
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

    public override async Task<SetAdminResponse> SetAdmin(SetAdminRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
          throw new Exception("Unauthorized");

        await _userManager.SetAdmin(request.AccountId, request.IsAdmin);

        return new SetAdminResponse { Profile = await BuildProfile(request.AccountId) };
    }
}

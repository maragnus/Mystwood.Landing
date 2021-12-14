using Grpc.Core;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.Services;

partial class LarpService
{
    public override Task<GetAccountResponse> GetAccount(GetAccountRequest request, ServerCallContext context) => base.GetAccount(request, context);
    public override Task<SearchAccountsResponse> SearchAccounts(SearchAccountsRequest request, ServerCallContext context) => base.SearchAccounts(request, context);
    public override async Task<SearchCharactersResponse> SearchCharacters(SearchCharactersRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifyAdminSessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var characters = await _characterManager.QueryCharacters(request.Query);

        var response = new SearchCharactersResponse();
        response.Characters.AddRange(characters);

        return response;
    }

    public override Task<SetAdminResponse> SetAdmin(SetAdminRequest request, ServerCallContext context) => base.SetAdmin(request, context);
}

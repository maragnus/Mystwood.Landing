using Grpc.Core;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.LarpServices;

partial class LarpAccountService
{
    public override async Task<AccountResponse> AddAccountEmail(UpdateAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.AddEmail(accountId, request.Value);

        return await LarpUtilities.CreateAccountResponse(_userManager, accountId);
    }

    public override async Task<AccountResponse> RemoveAccountEmail(UpdateAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.RemoveEmail(accountId, request.Value);

        return await LarpUtilities.CreateAccountResponse(_userManager, accountId);
    }

    public override async Task<AccountResponse> SetAccountName(UpdateAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.SetName(accountId, request.Value);

        return await LarpUtilities.CreateAccountResponse(_userManager, accountId);
    }

    public override async Task<AccountResponse> SetAccountLocation(UpdateAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.SetLocation(accountId, request.Value);

        return await LarpUtilities.CreateAccountResponse(_userManager, accountId);
    }

    public override async Task<AccountResponse> SetAccountPhone(UpdateAccountRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.SetPhone(accountId, request.Value);

        return await LarpUtilities.CreateAccountResponse(_userManager, accountId);
    }

    public override async Task<AccountResponse> GetAccount(BasicRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        return await LarpUtilities.CreateAccountResponse(_userManager, accountId);
    }
}

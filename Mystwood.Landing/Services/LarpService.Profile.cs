using Grpc.Core;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.Services;

partial class LarpService
{
    public override async Task<UpdateProfileResponse> AddProfileEmail(UpdateProfileRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.AddEmail(accountId, request.Value);

        return await CreateProfileResponse(accountId);
    }

    public override async Task<UpdateProfileResponse> RemoveProfileEmail(UpdateProfileRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.RemoveEmail(accountId, request.Value);

        return await CreateProfileResponse(accountId);
    }

    public override async Task<UpdateProfileResponse> SetProfileName(UpdateProfileRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.SetName(accountId, request.Value);

        return await CreateProfileResponse(accountId);
    }

    public override async Task<UpdateProfileResponse> SetProfileLocation(UpdateProfileRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.SetLocation(accountId, request.Value);

        return await CreateProfileResponse(accountId);
    }

    public override async Task<UpdateProfileResponse> SetProfilePhone(UpdateProfileRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        await _userManager.SetPhone(accountId, request.Value);

        return await CreateProfileResponse(accountId);
    }

    public override async Task<GetProfileResponse> GetProfile(GetProfileRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");
        return new GetProfileResponse()
        {
            Profile = await BuildProfile(accountId)
        };
    }
}

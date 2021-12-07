using Grpc.Core;
using Microsoft.Extensions.Options;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.Services;

public class LarpService : Larp.LarpBase
{
    private readonly ILogger<LarpService> _logger;
    private readonly AccountOptions _options;
    private readonly ITokenManager _tokenManager;
    private readonly IEmailManager _emailManager;
    private readonly IUserManager _userManager;

    public LarpService(ILogger<LarpService> logger, IEmailManager emailManager, ITokenManager tokenManager, IOptions<AccountOptions> options, IUserManager userManager)
    {
        _logger = logger;
        _emailManager = emailManager;
        _tokenManager = tokenManager;
        _options = options.Value;
        _userManager = userManager;
    }

    public override async Task<InitiateLoginResponse> InitiateLogin(InitiateLoginRequest request, ServerCallContext context)
    {
        _logger.LogInformation("Initiating login for {Email} from {Source}", request.Email, context.Peer);

        // Accounts can be banned or email address is invalid
        var isValid = await _userManager.ValidateAccount(request.Email, context.Peer);
        if (!isValid)
            return new InitiateLoginResponse() { StatusCode = ValidationResponseCode.Invalid };

        var code = await _tokenManager.CreateUserCode(request.Email, _options.SignInTokenDuration, context.Peer);
        await _emailManager.SendEmail(request.Email, "Mystwood Landing Sign In Code", $"Please use this code to continue signing into your account: {code}");
        return new InitiateLoginResponse() { StatusCode = ValidationResponseCode.Success };
    }

    public override async Task<ConfirmLoginResponse> ConfirmLogin(ConfirmLoginRequest request, ServerCallContext context)
    {
        _logger.LogInformation("Confirming login for {Email} from {Source}", request.Email, context.Peer);
        var validationStatus = await _tokenManager.ValidateUserCode(request.Code, request.Email, context.Peer);
        if (!validationStatus.IsSuccessful)
            return new ConfirmLoginResponse
            {
                StatusCode = ValidationResponseCode.Invalid,
                Message = $"{validationStatus.Status}"
            };

        var sessionId = await _userManager.CreateSessionId(request.Email, context.Peer);
        Profile profile = await BuildProfile(sessionId);

        return new ConfirmLoginResponse()
        {
            StatusCode = ValidationResponseCode.Success,
            Session = new SessionIdentifier(sessionId),
            Profile = profile
        };
    }

    private async Task<Profile> BuildProfile(string sessionId)
    {
        var userProfile = await _userManager.GetProfile(sessionId);
        var profile = new Profile
        {
            Name = userProfile.Name ?? "",
            Phone = userProfile.Phone ?? "",
            Location = userProfile.Location ?? ""
        };
        profile.Emails.AddRange(userProfile.Emails.Select(x => new ProfileEmail { Email = x }));
        return profile;
    }

    public override async Task<UpdateProfileResponse> AddProfileEmail(UpdateProfileRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        await _userManager.AddEmail(sessionId, request.Value);

        return new UpdateProfileResponse()
        {
            Profile = await BuildProfile(sessionId)
        };
    }

    public override async Task<UpdateProfileResponse> RemoveProfileEmail(UpdateProfileRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        await _userManager.RemoveEmail(sessionId, request.Value);

        return new UpdateProfileResponse()
        {
            Profile = await BuildProfile(sessionId)
        };
    }

    public override async Task<UpdateProfileResponse> SetProfileName(UpdateProfileRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        await _userManager.SetName(sessionId, request.Value);

        return new UpdateProfileResponse()
        {
            Profile = await BuildProfile(sessionId)
        };
    }

    public override async Task<UpdateProfileResponse> SetProfileLocation(UpdateProfileRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        await _userManager.SetLocation(sessionId, request.Value);

        return new UpdateProfileResponse()
        {
            Profile = await BuildProfile(sessionId)
        };
    }

    public override async Task<UpdateProfileResponse> SetProfilePhone(UpdateProfileRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        await _userManager.SetPhone(sessionId, request.Value);

        return new UpdateProfileResponse()
        {
            Profile = await BuildProfile(sessionId)
        };
    }

    public override async Task<GetProfileResponse> GetProfile(GetProfileRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        return new GetProfileResponse()
        {
            Profile = await BuildProfile(sessionId)
        };
    }

    public override async Task<GetCharactersResponse> GetCharacters(GetCharactersRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        var response = new GetCharactersResponse();

        response.Character.Clear();
        // TODO -- do something

        return response;
    }

    public override async Task<UpdateCharacterResponse> UpdateCharacterDraft(UpdateCharacterRequest request, ServerCallContext context)
    {
        var sessionId = request.Session.SessionId;

        if (!await _userManager.VerifySessionId(sessionId))
            throw new Exception("Unauthorized");

        // TODO -- do something

        return new UpdateCharacterResponse() { Character = request.Character };
    }

}

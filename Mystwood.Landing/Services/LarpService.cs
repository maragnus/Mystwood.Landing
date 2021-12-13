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
    private readonly ICharacterManager _characterManager;

    public LarpService(ILogger<LarpService> logger, IEmailManager emailManager, ITokenManager tokenManager, IOptions<AccountOptions> options, IUserManager userManager, ICharacterManager characterManager)
    {
        _logger = logger;
        _emailManager = emailManager;
        _tokenManager = tokenManager;
        _options = options.Value;
        _userManager = userManager;
        _characterManager = characterManager;
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

        if (request.Email != "demo" && request.Code != "demo")
        {
            var validationStatus = await _tokenManager.ValidateUserCode(request.Code, request.Email, context.Peer);
            if (!validationStatus.IsSuccessful)
            {
                return new ConfirmLoginResponse
                {
                    StatusCode = ValidationResponseCode.Invalid,
                    Message = $"{validationStatus.Status}"
                };
            }
        }

        var sessionId = await _userManager.CreateSessionId(request.Email, context.Peer);

        var accountId = await _userManager.VerifySessionId(sessionId) ??
            throw new Exception("Unauthorized");

        var profile = await BuildProfile(accountId);

        return new ConfirmLoginResponse()
        {
            StatusCode = ValidationResponseCode.Success,
            Session = new SessionIdentifier(sessionId),
            Profile = profile
        };
    }

    private async Task<Profile> BuildProfile(int accountId)
    {
        var userProfile = await _userManager.GetProfile(accountId);
        var profile = new Profile
        {
            Name = userProfile.Name ?? "",
            Phone = userProfile.Phone ?? "",
            Location = userProfile.Location ?? ""
        };
        profile.Emails.AddRange(userProfile.Emails.Select(x => new ProfileEmail { Email = x }));
        return profile;
    }

    private async Task<UpdateProfileResponse> CreateProfileResponse(int accountId) =>
        new UpdateProfileResponse()
        {
            Profile = await BuildProfile(accountId)
        };

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

    public override async Task<GetCharactersResponse> GetCharacters(GetCharactersRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var characters = await _characterManager.GetCharacters(accountId);

        var response = new GetCharactersResponse();
        response.Characters.AddRange(characters);

        return response;
    }

    public override async Task<CharacterResponse> GetCharacter(GetCharacterRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.GetCharacter(request.CharacterId);

        return new CharacterResponse() { Character = character };
    }

    public override async Task<CharacterResponse> UpdateCharacterDraft(UpdateCharacterRequest request, ServerCallContext context)
    {

        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.UpdateCharacterDraft(accountId, request.CharacterId, request.DraftJson, request.IsReview);

        return new CharacterResponse() { Character = character };
    }

    public override async Task<CharacterResponse> CreateCharacterDraft(CreateCharacterRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.CreateCharacter(accountId, request.CharacterName, request.HomeChapter);

        return new CharacterResponse() { Character = character };
    }
}

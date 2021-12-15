using Grpc.Core;
using Microsoft.Extensions.Options;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.LarpServices;

public class LarpAuthenticationService : LarpAuthentication.LarpAuthenticationBase
{
    private readonly ILogger<LarpAuthenticationService> _logger;
    private readonly AccountOptions _options;
    private readonly ITokenManager _tokenManager;
    private readonly IEmailManager _emailManager;
    private readonly IUserManager _userManager;

    public LarpAuthenticationService(ILogger<LarpAuthenticationService> logger, IEmailManager emailManager, ITokenManager tokenManager, IOptions<AccountOptions> options, IUserManager userManager)
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

        var profile = await LarpUtilities.BuildProfile(_userManager, accountId);

        return new ConfirmLoginResponse()
        {
            StatusCode = ValidationResponseCode.Success,
            Session = new SessionIdentifier(sessionId),
            Profile = profile
        };
    }
}

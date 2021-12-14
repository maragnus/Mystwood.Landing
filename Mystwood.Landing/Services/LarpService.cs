using Microsoft.Extensions.Options;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.Services;

public partial class LarpService : Larp.LarpBase
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

    private async Task<Profile> BuildProfile(int accountId)
    {
        var userProfile = await _userManager.GetProfile(accountId);
        var profile = new Profile
        {
            AccountId = 0,
            IsAdmin = userProfile.IsAdmin ?? false,
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
}

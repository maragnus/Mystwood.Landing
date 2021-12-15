using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.LarpServices;

internal static class LarpUtilities
{
    public static async Task<Account> BuildProfile(IUserManager userManager, int accountId)
    {
        var userProfile = await userManager.GetProfile(accountId);
        var profile = new Account
        {
            AccountId = 0,
            IsAdmin = userProfile.IsAdmin ?? false,
            Name = userProfile.Name ?? "",
            Phone = userProfile.Phone ?? "",
            Location = userProfile.Location ?? ""
        };
        profile.Emails.AddRange(userProfile.Emails.Select(x => new AccountEmail { Email = x }));
        return profile;
    }

    public static async Task<AccountResponse> CreateAccountResponse(IUserManager userManager, int accountId) =>
        new AccountResponse()
        {
            Profile = await BuildProfile(userManager, accountId)
        };
}

using Microsoft.AspNetCore.Mvc;

namespace Mystwood.Landing.MwlApi.Authorization;

[Route("api/token")]
public class TokenController : Controller
{
    private ITokenProvider _tokenProvider;

    public TokenController(ITokenProvider tokenProvider) // We'll create this later, don't worry.
    {
        _tokenProvider = tokenProvider;
    }

    [HttpPost]
    public JsonWebToken Get([FromQuery] string grant_type, [FromQuery] string? username, [FromQuery] string? password, [FromQuery] string? refresh_token)
    {
        // Authenticate depending on the grant type.
        ApplicationUser? user = grant_type == "refresh_token"
            ? GetUserByToken(refresh_token)
            : GetUserByCredentials(username, password);

        if (user == null)
            throw new UnauthorizedAccessException("user is required");

        int ageInMinutes = 20;  // However long you want...

        DateTime expiry = DateTime.UtcNow.AddMinutes(ageInMinutes);

        var token = new JsonWebToken
        {
            access_token = _tokenProvider.CreateToken(user, expiry),
            expires_in = ageInMinutes * 60
        };

        if (grant_type != "refresh_token")
            token.refresh_token = GenerateRefreshToken(user);

        return token;
    }

    private ApplicationUser? GetUserByToken(string? refreshToken)
    {
        // TODO: Check token against your database.
        if (refreshToken == "test")
            return new ApplicationUser { UserName = "test" };

        return null;
    }

    private ApplicationUser? GetUserByCredentials(string? username, string? password)
    {
        // TODO: Check username/password against your database.
        if (username == password)
            return new ApplicationUser { UserName = username };

        return null;
    }

    private string GenerateRefreshToken(ApplicationUser user)
    {
        // TODO: Create and persist a refresh token.
        return "test";
    }
}

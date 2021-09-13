using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.MwlApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : Controller
{
    private readonly IMystwoodDatabase _db;

    public AccountController(IMystwoodDatabase db) =>
        _db = db;

    [Authorize]
    [HttpGet("Test")]
    public async Task<string> Test() => HttpContext.User.Identity.Name;


    [AllowAnonymous]
    [HttpPost("Authenticate")]
    public async Task<IActionResult> Authenticate(string email, string password)
    {
        if (email == "acrion@gmail.com")
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, "Josh")
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties()
            {
                IsPersistent = true
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), authProperties);
            return Ok();
        }

        var passwordHash = BitConverter.ToString(System.Security.Cryptography.SHA512.HashData(Encoding.UTF8.GetBytes(password)));

        var filter = Builders<Player>.Filter.AnyEq(p => p.Emails, email);
        var player = await _db.Players.Find(filter).SingleOrDefaultAsync();

        if (player == null)
            return Unauthorized(ErrorRepsonse("Email address is not registered"));

        if (passwordHash != player.HashedPassword)
        {
            // TODO -- record failed login
            // TODO -- add lockout logic
            return Unauthorized(ErrorRepsonse("Password does not match"));
        }

        return Ok();
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register(string email, string password)
    {
        var filter = Builders<Player>.Filter.AnyEq(p => p.Emails, email);
        var player = await _db.Players.Find(filter).SingleOrDefaultAsync();

        if (player != null)
            return BadRequest(ErrorRepsonse("Email address is already registered"));

        return Ok();
    }

    private object ErrorRepsonse(string errorMessage, object? details = null) =>
        new
        {
            ErrorMessage = errorMessage,
            Details = details
        };
}

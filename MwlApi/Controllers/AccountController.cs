using System.Text;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.MwlApi.Controllers;
public class AccountController : Controller
{
    private readonly IMystwoodDatabase _db;

    public AccountController(IMystwoodDatabase db) =>
        _db = db;

    public async Task<IActionResult> Authenticate(string email, string password)
    {
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

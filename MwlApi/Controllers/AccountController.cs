using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public string? Test() => HttpContext.User.Identity?.Name;

}

using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.MwlApi.Controllers;

[Route("api/players")]
[ApiController]
public class PlayerController : ControllerBase
{
    private readonly IMystwoodDatabase _db;

    public PlayerController(IMystwoodDatabase db) => _db = db;

    [HttpGet]
    [ProducesResponseType(typeof(PlayerModel[]), 200)]
    public async Task<ActionResult> GetAllPlayers(CancellationToken cancellationToken)
    {
        var players = await _db.Players
            .Aggregate()
            .Lookup(_db.Characters, p => p.PlayerId, c => c.PlayerId, (PlayerWithCharacters x) => x.PlayerId)
            .FirstOrDefaultAsync(cancellationToken);

        return Ok(players);
    }

    [HttpGet("{playerId}")]
    [ProducesResponseType(typeof(PlayerModel), 200)]
    [ProducesResponseType(typeof(ErrorDetails), 404)]
    public async Task<IActionResult> GetPlayer([FromRoute] string playerId, CancellationToken cancellationToken)
    {
        var player = await _db.Players
            .Aggregate()
            .Match(c => c.PlayerId == playerId)
            .Lookup(_db.Characters, p => p.PlayerId, c => c.PlayerId, (PlayerWithCharacters x) => x.PlayerId)
            .FirstOrDefaultAsync(cancellationToken);

        if (player == null) return NotFound();

        return Ok(player);
    }

    [HttpPost]
    [ProducesResponseType(typeof(PlayerModel), 200)]
    [ProducesResponseType(typeof(ErrorDetails), 400)]
    public async Task<IActionResult> AddPlayer([FromBody] PlayerModel player, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(player.Email))
            return BadRequest("Email is requried");

        var existingPlayer = await _db.GetPlayerIdByEmail(player.Email, cancellationToken);
        if (existingPlayer != null)
            return BadRequest(new ErrorDetails("Email is already registered"));


        await _db.Players.InsertOneAsync(new Player
        {
            Name = player.Name,
            PrimaryEmail = player.Email,
            NormalizedEmails = new[] { player.Email.ToUpperInvariant() }
        }, new InsertOneOptions(), cancellationToken);
        return Ok(player);
    }

    [HttpPatch("{playerId}")]
    [ProducesResponseType(typeof(PlayerModel), 200)]
    [ProducesResponseType(typeof(ErrorDetails), 400)]
    public IActionResult UpdatePlayer([FromRoute] string playerId, [FromBody] Player player, CancellationToken cancellationToken)
    {
        return Ok();
    }
}

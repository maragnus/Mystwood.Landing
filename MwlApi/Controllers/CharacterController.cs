using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.MwlApi.Controllers;

[Route("api/characters")]
[ApiController]
public class CharacterController : ControllerBase
{
    private readonly IMystwoodDatabase _db;

    public CharacterController(IMystwoodDatabase db) => _db = db;

    [HttpGet("{characterId}")]
    public async Task<IActionResult> GetCharacter([FromRoute] string characterId, CancellationToken cancellationToken)
    {
        var character = await _db.Characters
            .Find(c => c.CharacterId == characterId)
            .FirstOrDefaultAsync(cancellationToken);
        if (character == null) return NotFound();

        return Ok(character);
    }

    [HttpPost]
    public Task<Character> AddCharacter([FromBody] Character character, CancellationToken cancellationToken)
    {
        return Task.FromResult(character);
    }

    [HttpPatch("{characterId}")]
    public Task<Character> UpdateCharacter([FromRoute] string characterId, [FromBody] Character character, CancellationToken cancellationToken)
    {
        return Task.FromResult(character);
    }
}

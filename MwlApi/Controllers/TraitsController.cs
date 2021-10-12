using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.MwlApi.Controllers;

[Route("api/traits")]
[ApiController]
public class TraitsController : ControllerBase
{
    private readonly IMystwoodDatabase _db;

    public TraitsController(IMystwoodDatabase db) => _db = db;

    [HttpGet]
    [ProducesResponseType(typeof(Trait[]), 200)]
    public async Task<ActionResult> Traits(CancellationToken cancellationToken)
    {
        var traits = await _db.Traits
            .Find(Builders<Trait>.Filter.Empty)
            .ToListAsync(cancellationToken);
        return Ok(traits);
    }

    [HttpGet("{traitId}")]
    [ProducesResponseType(200)]
    public async Task<ActionResult> Traits([FromRoute] string traitId, CancellationToken cancellationToken)
    {
        var trait = await _db.Traits
            .Find(t => t.TraitId == traitId)
            .As<MongoDB.Bson.BsonDocument>()
            .FirstOrDefaultAsync(cancellationToken);
        return trait == null ? NotFound() : Ok(trait);
    }

    [HttpGet("summmaries")]
    [ProducesResponseType(typeof(TraitSummary[]), 200)]
    public async Task<ActionResult> TraitSummaries(CancellationToken cancellationToken)
    {
        var traits = await _db.Traits
            .Find(Builders<Trait>.Filter.Empty)
            .Project(Builders<Trait>.Projection.As<TraitSummary>())
            .ToListAsync(cancellationToken);
        return Ok(traits);
    }
}

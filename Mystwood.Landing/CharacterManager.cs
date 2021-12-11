using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Mystwood.Landing.Data;

namespace Mystwood.Landing;

public interface ICharacterManager
{
    Task<IEnumerable<CharacterData>> GetCharacters(int accountId);
}

public enum CharacterDataState
{
    New,
    Live,
    Draft,
    Review
}

public record CharacterData(
    string Id,
    string CharacterName,
    string? PlayerName,
    CharacterDataState State,
    string? Specialty,
    string? HomeChapter,
    int? CurrentLevel
);

public class CharacterManager : ICharacterManager
{
    private readonly ApplicationDbContext _db;
    private readonly ISystemClock _clock;

    public CharacterManager(ApplicationDbContext db, ISystemClock systemClock)
    {
        _db = db;
        _clock = systemClock;
    }

    public async Task<IEnumerable<CharacterData>> GetCharacters(int accountId)
    {
        var revisions = await _db.CharacterRevisions.Include(x => x.Character)
            .Where(x => x.Character!.AccountId == accountId)
            .Where(x => x.State != CharacterState.Archived)
            .ToListAsync();

        return revisions.GroupBy(x => x.Character!).Select(ch =>
        {
            var live = ch.FirstOrDefault(y => y.State == CharacterState.Live);
            var draft = ch.FirstOrDefault(y => y.State == CharacterState.Draft);
            var review = ch.FirstOrDefault(y => y.State == CharacterState.Review);

            var current = (live ?? draft ?? review);
            if (current == null)
                return null!;

            var json = JsonDocument.Parse(current.Json!);

            CharacterDataState state;
            if (live != null && draft == null && review == null)
                state = CharacterDataState.Live;
            else if (review != null)
                state = CharacterDataState.Review;
            else if (live != null)
                state = CharacterDataState.New;
            else
                state = CharacterDataState.Draft;

            return new CharacterData(
                ch.Key.Id!.Value.ToString(),
                ch.Key.Name!,
                PlayerName: null,
                state,
                json.RootElement.GetProperty("specialty").GetString(),
                json.RootElement.GetProperty("homeChapter").GetString(),
                json.RootElement.GetProperty("currentLevel").GetInt32()
            );
        });
    }
}

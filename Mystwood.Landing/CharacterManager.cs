using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Mystwood.Landing.Data;
using Mystwood.Landing.GrpcLarp;
using Character = Mystwood.Landing.GrpcLarp.Character;
using DbCharacter = Mystwood.Landing.Data.Character;

namespace Mystwood.Landing;

public interface ICharacterManager
{
    Task<IEnumerable<CharacterSummary>> GetCharacters(int accountId);
    Task<Character> GetCharacter(string characterId);
    Task<Character> CreateCharacter(int accountId, string characterName, string homeChapter);
    Task<Character> UpdateCharacterDraft(int accountId, string characterId, string draftJson, bool isReview);
    Task<Character> ApproveCharacter(string characterId);
}

public class CharacterManager : ICharacterManager
{
    private readonly ApplicationDbContext _db;
    private readonly ISystemClock _clock;

    public CharacterManager(ApplicationDbContext db, ISystemClock systemClock)
    {
        _db = db;
        _clock = systemClock;
    }

    public async Task<Character> GetCharacter(string characterId)
    {
        var id = Guid.Parse(characterId);

        var revisions = await _db.CharacterRevisions
            .AsNoTrackingWithIdentityResolution()
            .Include(x => x.Character)
            .Where(x => x.Character!.Id == id)
            .Where(x => x.State != CharacterState.Archived)
            .ToListAsync();


        return DbToCharacter(revisions.First().Character!);
    }

    public async Task<IEnumerable<CharacterSummary>> GetCharacters(int accountId)
    {
        var revisions = await _db.CharacterRevisions
            .AsNoTrackingWithIdentityResolution()
            .Include(x => x.Character)
            .Where(x => x.Character!.AccountId == accountId)
            .Where(x => x.State != CharacterState.Archived)
            .ToListAsync();
        return ToCharacterData(revisions);
    }

    private static IEnumerable<CharacterSummary> ToCharacterData(IEnumerable<CharacterRevision> revisions) =>
        revisions
        .GroupBy(x => x.Character!)
        .Select(ch =>
        {
            var live = ch.FirstOrDefault(y => y.State == CharacterState.Live);
            var draft = ch.FirstOrDefault(y => y.State == CharacterState.Draft);
            var review = ch.FirstOrDefault(y => y.State == CharacterState.Review);

            var current = (live ?? draft ?? review);
            if (current == null)
                return null!;

            var json = JsonDocument.Parse(current.Json!);

            return new CharacterSummary
            {
                CharacterId = ch.Key.Id!.Value.ToString(),
                CharacterName = ch.Key.Name!,
                AccountName = "",
                HomeChapter = TryGetStringProperty(json.RootElement, "homeChapter") ?? "Undefined",
                Specialty = TryGetStringProperty(json.RootElement, "specialty") ?? "Undefined",
                Level = TryGetInt32Property(json.RootElement, "currentLevel") ?? 0,
                IsLive = live != null,
                IsReview = review != null,
            };
        })
        .Where(x => x != null);

    public static string? TryGetStringProperty(JsonElement element, string propertyName, string? defaultValue = default) =>
        element.TryGetProperty(propertyName, out var property) ? property.GetString() ?? defaultValue : defaultValue;

    public static int? TryGetInt32Property(JsonElement element, string propertyName) =>
        element.TryGetProperty(propertyName, out var property)
        ? (property.TryGetInt32(out var value) ? value : null)
        : null;

    public async Task<Character> CreateCharacter(int accountId, string characterName, string homeChapter)
    {
        var json = new
        {
            @characterName = characterName,
            @homeChapter = homeChapter
        };

        var now = _clock.UtcNow;
        var ch = new DbCharacter()
        {
            AccountId = accountId,
            CreatedOn = now,
            Name = characterName,
            CharacterRevisions =
            {
                new CharacterRevision()
                {
                    CreatedOn= now,
                    CharacterRevisionEvents = {
                        new CharacterRevisionEvent {
                            ChangedOn = now,
                            State = CharacterState.Draft
                        }
                    },
                    State = CharacterState.Draft,
                    Json = JsonSerializer.Serialize(json)
                }
            }
        };
        _db.Characters.Add(ch);
        await _db.SaveChangesAsync();

        return DbToCharacter(ch);
    }

    private static Character DbToCharacter(DbCharacter ch) =>
        new Character
        {
            AccountId = ch.AccountId!.Value,
            CharacterId = ch.Id.ToString(),
            LiveJson = ch.CharacterRevisions.FirstOrDefault(x => x.State == CharacterState.Live)?.Json ?? "{}",
            DraftJson = ch.CharacterRevisions.FirstOrDefault(x => x.State == CharacterState.Draft || x.State == CharacterState.Review)?.Json ?? "{}",
            IsLive = ch.CharacterRevisions.Any(x => x.State == CharacterState.Live),
            IsReview = ch.CharacterRevisions.Any(x => x.State == CharacterState.Review),
            Metadata = ch.Metadata ?? "{}"
        };

    public async Task<Character> UpdateCharacterDraft(int accountId, string characterId, string draftJson, bool isReview)
    {
        var id = Guid.Parse(characterId);
        var now = _clock.UtcNow;

        var revisions = await _db.CharacterRevisions
            .Include(x => x.Character)
            .Where(x => x.Character!.AccountId == accountId)
            .Where(x => x.Character!.Id == id)
            .Where(x => x.State != CharacterState.Archived)
            .ToListAsync();

        var targetState = isReview ? CharacterState.Review : CharacterState.Draft;

        var draft = revisions.FirstOrDefault(x => x.State != CharacterState.Live);
        if (draft == null)
        {
            // Create a new draft
            draft = new CharacterRevision
            {
                CharacterId = id,
                CreatedOn = now,
                State = targetState,
                CharacterRevisionEvents = {
                    new CharacterRevisionEvent
                    {
                        ChangedOn = now,
                        State = targetState
                    }
                },
                Json = draftJson
            };
            revisions.Add(draft);
            _db.CharacterRevisions.Add(draft);
        }
        else
        {
            // Update the existing draft
            if (draft.State != targetState)
            {
                draft.State = targetState;
                draft.CharacterRevisionEvents.Add(new CharacterRevisionEvent
                {
                    ChangedOn = now,
                    State = targetState
                });
            }
            draft.Json = draftJson;
        }

        await _db.SaveChangesAsync();
        return await GetCharacter(characterId);
    }

    public async Task<Character> ApproveCharacter(string characterId)
    {
        var id = Guid.Parse(characterId);
        var now = _clock.UtcNow;

        var revisions = await _db.CharacterRevisions
            .Include(x => x.Character)
            .Where(x => x.Character!.Id == id)
            .Where(x => x.State != CharacterState.Archived)
            .ToListAsync();

        // Archive the Live revision
        var live = revisions.FirstOrDefault(x => x.State == CharacterState.Live);
        if (live != null)
        {
            live.State = CharacterState.Archived;
            live.CharacterRevisionEvents.Add(new CharacterRevisionEvent
            {
                ChangedOn = now,
                State = CharacterState.Archived
            });
        }

        // Promote the Draft/Review revision
        var draft = revisions.First(x => x.State != CharacterState.Live);
        draft.State = CharacterState.Live;
        draft.CharacterRevisionEvents.Add(new CharacterRevisionEvent
        {
            ChangedOn = now,
            State = CharacterState.Live
        });

        await _db.SaveChangesAsync();
        return await GetCharacter(characterId);
    }
}

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
    Task<Character> UpdateCharacterDraft(int accountId, string characterId, string draftJson);
    Task<Character> UpdateCharacterInReview(int accountId, string characterId, bool inReview);
    Task<Character> ApproveCharacter(string characterId, int accountId);
    Task<IEnumerable<CharacterSummary>> QueryCharacters(string query);
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
            .Where(x => x.State != RevisionState.Archived)
            .ToListAsync();


        return DbToCharacter(revisions.First().Character!);
    }

    public async Task<IEnumerable<CharacterSummary>> GetCharacters(int accountId)
    {
        var revisions = await _db.CharacterRevisions
            .AsNoTrackingWithIdentityResolution()
            .Include(x => x.Character)
            .Where(x => x.Character!.AccountId == accountId)
            .Where(x => x.State != RevisionState.Archived)
            .ToListAsync();
        return ToCharacterData(revisions);
    }

    public static IEnumerable<CharacterSummary> ToCharacterData(IEnumerable<CharacterRevision> revisions) =>
        revisions
        .GroupBy(x => x.Character!)
        .Select(ch =>
        {
            var live = ch.FirstOrDefault(y => y.State == RevisionState.Live);
            var draft = ch.FirstOrDefault(y => y.State == RevisionState.Draft);
            var review = ch.FirstOrDefault(y => y.State == RevisionState.Review);

            var current = (live ?? draft ?? review);
            if (current == null)
                return null!;

            var json = JsonDocument.Parse(current.Json!);

            return new CharacterSummary
            {
                CharacterId = ch.Key.Id!.Value.ToString(),
                CharacterName = ch.Key.Name ?? "Unnamed",
                AccountId = ch.Key.AccountId ?? 0,
                AccountName = ch.Key.Account?.Name ?? "Unnamed",
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
                            State = RevisionState.Draft,
                            ChangedByAccountId = accountId,
                        }
                    },
                    State = RevisionState.Draft,
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
            LiveJson = ch.CharacterRevisions.FirstOrDefault(x => x.State == RevisionState.Live)?.Json ?? "{}",
            DraftJson = ch.CharacterRevisions.FirstOrDefault(x => x.State == RevisionState.Draft || x.State == RevisionState.Review)?.Json ?? "{}",
            IsLive = ch.CharacterRevisions.Any(x => x.State == RevisionState.Live),
            IsReview = ch.CharacterRevisions.Any(x => x.State == RevisionState.Review),
            Metadata = ch.Metadata ?? "{}"
        };

    public async Task<Character> UpdateCharacterDraft(int accountId, string characterId, string draftJson)
    {
        var id = Guid.Parse(characterId);
        var now = _clock.UtcNow;

        var revisions = await _db.CharacterRevisions
            .Include(x => x.Character)
            .Where(x => x.Character!.AccountId == accountId)
            .Where(x => x.Character!.Id == id)
            .Where(x => x.State != RevisionState.Archived)
            .ToListAsync();

        var draft = revisions.FirstOrDefault(x => x.State != RevisionState.Live);
        if (draft == null)
        {
            // Create a new draft
            draft = new CharacterRevision
            {
                CharacterId = id,
                CreatedOn = now,
                State = RevisionState.Draft,
                CharacterRevisionEvents = {
                    new CharacterRevisionEvent
                    {
                        ChangedOn = now,
                        State = RevisionState.Draft,
                        ChangedByAccountId = accountId,
                    }
                },
                Json = draftJson
            };
            revisions.Add(draft);
            _db.CharacterRevisions.Add(draft);
        }
        else
        {
            draft.Json = draftJson;
        }

        await _db.SaveChangesAsync();
        return await GetCharacter(characterId);
    }


    public async Task<Character> UpdateCharacterInReview(int accountId, string characterId, bool isReview)
    {
        var id = Guid.Parse(characterId);
        var now = _clock.UtcNow;

        var revisions = await _db.CharacterRevisions
            .Include(x => x.Character)
            .Where(x => x.Character!.AccountId == accountId)
            .Where(x => x.Character!.Id == id)
            .Where(x => x.State != RevisionState.Archived)
            .ToListAsync();

        var targetState = isReview ? RevisionState.Review : RevisionState.Draft;

        var draft = revisions.FirstOrDefault(x => x.State != RevisionState.Live);
        if (draft == null || draft.State == targetState)
            return await GetCharacter(characterId);

        // Update the existing draft
        draft.State = targetState;
        draft.CharacterRevisionEvents.Add(new CharacterRevisionEvent
        {
            ChangedOn = now,
            State = targetState,
            ChangedByAccountId = accountId,
        });

        await _db.SaveChangesAsync();
        return await GetCharacter(characterId);
    }

    public async Task<Character> ApproveCharacter(string characterId, int accountId)
    {
        var id = Guid.Parse(characterId);
        var now = _clock.UtcNow;

        var revisions = await _db.CharacterRevisions
            .Include(x => x.Character)
            .Where(x => x.Character!.Id == id)
            .Where(x => x.State != RevisionState.Archived)
            .ToListAsync();

        // Archive the Live revision
        var live = revisions.FirstOrDefault(x => x.State == RevisionState.Live);
        if (live != null)
        {
            live.State = RevisionState.Archived;
            live.CharacterRevisionEvents.Add(new CharacterRevisionEvent
            {
                ChangedOn = now,
                State = RevisionState.Archived,
                ChangedByAccountId = accountId
            });
        }

        // Promote the Draft/Review revision
        var draft = revisions.First(x => x.State != RevisionState.Live);
        draft.State = RevisionState.Live;
        draft.CharacterRevisionEvents.Add(new CharacterRevisionEvent
        {
            ChangedOn = now,
            State = RevisionState.Live,
            ChangedByAccountId = accountId
        });

        await _db.SaveChangesAsync();
        return await GetCharacter(characterId);
    }

    public async Task<IEnumerable<CharacterSummary>> QueryCharacters(string query)
    {
        query = query.ToUpper();

        var revisions = await _db.CharacterRevisions
            .AsNoTrackingWithIdentityResolution()
            .Include(x => x.Character)
            .Include(x => x.Character!.Account)
            .OrderBy(x => x.Character!.Name)
            .ThenBy(x => x.Character!.Id)
            .Where(x => x.State != RevisionState.Archived)
            .Where(x => EF.Functions.Like(x.Character!.Name!.ToUpper(), $"%{query}%")
            || EF.Functions.Like(x.Character!.Account!.Name!.ToUpper(), $"%{query}%"))
            .ToListAsync();
        return ToCharacterData(revisions);
    }
}

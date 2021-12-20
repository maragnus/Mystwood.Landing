using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.DataPorting;

public interface IDataConnector
{
    Task Connect();
    Task Export(params DtTable[] tables);
    Task<IEnumerable<DtTable>> Import(params string[] tableNames);
}

public class DataPorting
{
    private readonly ApplicationDbContext _db;
    private readonly IDataConnector _dataConnector;

    public DataPorting(ApplicationDbContext db, IDataConnector dataConnector)
    {
        _db = db;
        _dataConnector = dataConnector;
    }


    public static string? TryGetStringProperty(JsonElement element, string propertyName, string? defaultValue = default) =>
        element.TryGetProperty(propertyName, out var property) ? property.GetString() ?? defaultValue : defaultValue;

    public static int? TryGetInt32Property(JsonElement element, string propertyName) =>
        element.TryGetProperty(propertyName, out var property)
        ? (property.TryGetInt32(out var value) ? value : null)
        : null;

    public async Task Export()
    {
        await _dataConnector.Connect();

        await _dataConnector.Export(
            new DtTable
            {
                Name = "Accounts",
                Columns = new[] {
                    new DtColumn("Id", DtType.Integer),
                    new DtColumn("Name", DtType.Text),
                    new DtColumn("Location", DtType.Text),
                    new DtColumn("Emails", DtType.Text),
                    new DtColumn("Phone", DtType.Text),
                    new DtColumn("Notes", DtType.Text),
                    new DtColumn("DateOfBirth", DtType.DateOnly),
                    new DtColumn("Metadata", DtType.Text),
                    new DtColumn("IsAdmin", DtType.Boolean),
                    new DtColumn("IsValid", DtType.Boolean),
                    new DtColumn("Created", DtType.DateTime),
                },
                Rows = (await _db.Accounts
                    .Include(x => x.EmailAddresses)
                    .ToListAsync())
                    .Select(x => new object?[] {
                        x.Id,
                        x.Name,
                        x.Location,
                        string.Join(';', x.EmailAddresses.Select(x=>x.Email)),
                        x.PhoneNumber,
                        x.Notes,
                        x.DateOfBirth,
                        x.Metadata,
                        x.IsAdmin,
                        x.IsValid,
                        x.Created
                    })
            },
            new DtTable
            {
                Name = "Characters",
                Columns = new[] {
                    new DtColumn("ID", DtType.Text),
                    new DtColumn("Account ID", DtType.Integer),
                    new DtColumn("Total MS", DtType.Text),
                    new DtColumn("Submitted", DtType.DateTime),
                    new DtColumn("Character Name", DtType.Text),
                    new DtColumn("Player Name", DtType.Text),
                    new DtColumn("Home Chapter", DtType.Text),
                    new DtColumn("Occupation", DtType.Text),
                    new DtColumn("Occupational Enhancement", DtType.Text),
                    new DtColumn("Homeland", DtType.Text),
                    new DtColumn("Religion", DtType.Text),
                    new DtColumn("Courage", DtType.Text),
                    new DtColumn("Dexterity", DtType.Text),
                    new DtColumn("Empathy", DtType.Text),
                    new DtColumn("Passion", DtType.Text),
                    new DtColumn("Prowess", DtType.Text),
                    new DtColumn("Wisdom", DtType.Text),
                    new DtColumn("Level MS", DtType.Text),
                    new DtColumn("Occupational Skills", DtType.Text),
                    new DtColumn("Occupational Enhancement Skills", DtType.Text),
                    new DtColumn("Purchased Skills", DtType.Text),
                    new DtColumn("PS MS", DtType.Text), // Cost of all Purchased Skills
                    new DtColumn("Prog Sk", DtType.Text), // Count of Purchased Skills
                    new DtColumn("Free Skills", DtType.Text),
                    new DtColumn("Advantages", DtType.Text),
                    new DtColumn("Disadvantages", DtType.Text),
                    new DtColumn("Spells", DtType.Text),
                    new DtColumn("Cures", DtType.Text),
                    new DtColumn("Documents", DtType.Text),
                    new DtColumn("Public History", DtType.Text),
                    new DtColumn("Private History", DtType.Text),
                    new DtColumn("Unusual Features", DtType.Text),
                },
                Rows = (await _db.CharacterRevisions
                    .Include(x => x.Character).ThenInclude(x => x.Account)
                    .Include(x => x.CharacterRevisionEvents)
                    .Where(x => x.State == RevisionState.Live)
                    .ToListAsync())
                    .Select(x =>
                    {
                        var json = JsonDocument.Parse(x.Json!).RootElement;

                        return new object?[] {
                            x.CharacterId,
                            x.Character.AccountId,
                            0,
                            x.CharacterRevisionEvents.Max(x=>x.ChangedOn),
                            TryGetStringProperty(json, "characterName"),
                            x.Character.Account.Name,
                            TryGetStringProperty(json, "homeChapter"),
                        };
                    })
            });
    }

    record Vantage(string Name, int rank);

    object? VantageToJson(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return null;

        var list = new List<Vantage>();

        foreach (var item in value.Split(','))
        {
            var match = Regex.Match(item, @"(\d+) (.*)");
            if (match.Success)
                list.Add(new Vantage(match.Groups[2].Value, int.Parse(match.Groups[1].Value)));
        }

        return list;
    }

    int ToInt(object? value)
    {
        switch (value)
        {
            case string svalue: return int.TryParse(svalue, out int ivalue) ? ivalue : 0;
            case int intValue: return intValue;
            case double dblValue: return (int)dblValue;
            default: return 0;
        }
    }

    public async Task Import()
    {
        var now = DateTimeOffset.Now;

        var options = new JsonSerializerOptions();
        options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;

        await _dataConnector.Connect();

        var tables = await _dataConnector.Import("Characters");

        var account = await _db.Accounts.FirstAsync();

        await ImportCharacters(tables.Single(x => x.Name == "Characters"));

        async Task ImportCharacters(DtTable characters)
        {
            var dbCharacters = await _db.Characters.ToDictionaryAsync(x => x.Id!.Value);

            foreach (var character in characters.GetRows())
            {
                var characterName = character["Character Name"]?.ToString() ?? "Unnamed";

                var json = new
                {
                    CharacterName = characterName,
                    HomeChapter = character["Home Chapter"]?.ToString(),
                    Occupation = character["Occupation"]?.ToString(),
                    Enhancement = character["Occupational Enhancement"]?.ToString(),
                    Homeland = character["Homeland"]?.ToString(),
                    Religions = character["Religion"]?.ToString(),
                    Courage = ToInt(character["Courage"]),
                    Dexterity = ToInt(character["Dexterity"]),
                    Empathy = ToInt(character["Empathy"]),
                    Passion = ToInt(character["Passion"]),
                    Prowess = ToInt(character["Prowess"]),
                    Wisdom = ToInt(character["Wisdom"]),
                    Cures = character["Cures"]?.ToString(),
                    Documents = character["Documents"]?.ToString(),
                    PublicStory = character["Public History"]?.ToString(),
                    PrivateStory = character["Private History"]?.ToString(),
                    UnusualFeatures = character["Unusual Features"]?.ToString(),
                    Advantages = VantageToJson(character["Advantages"]?.ToString()),
                    Disadvantages = VantageToJson(character["Disadvantages"]?.ToString()),
                    Spells = (character["Spells"]?.ToString() ?? "").Split(',').Select(x => x.Trim()).Where(x => x.Length > 0).ToArray(),
                };

                Character? dbCharacter = await _db.Characters
                    .Include(x => x.CharacterRevisions)
                    .SingleOrDefaultAsync(x => x.Name == characterName);

                if (dbCharacter == null)
                {
                    dbCharacter = new Character
                    {
                        Name = characterName,
                        CreatedOn = now,
                        AccountId = account.Id,
                        Metadata = ""
                    }; // new Character
                    _db.Characters.Add(dbCharacter);
                }

                // Archive previos revision
                foreach (var revision in dbCharacter.CharacterRevisions.Where(x => x.State == RevisionState.Live))
                {
                    revision.State = RevisionState.Archived;
                    revision.CharacterRevisionEvents.Add(new CharacterRevisionEvent
                    {
                        ChangedOn = now,
                        State = RevisionState.Archived
                    });
                }

                dbCharacter.CharacterRevisions.Add(
                    new CharacterRevision()
                    {
                        CreatedOn = now,
                        State = RevisionState.Live,
                        Json = JsonSerializer.Serialize(json, options),
                        CharacterRevisionEvents = {
                                new CharacterRevisionEvent
                                {
                                    ChangedOn = now,
                                    State = RevisionState.Live
                                }
                            }
                    });


            }
        }

        await _db.SaveChangesAsync();
    }
}

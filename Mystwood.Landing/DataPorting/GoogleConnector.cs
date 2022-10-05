using System.IO;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Util;
using Microsoft.Extensions.Options;

namespace Mystwood.Landing.DataPorting;

public class GoogleConnector : IDataConnector
{
    private readonly GoogleOptions _options;

    private static string[] Scopes = { SheetsService.Scope.Spreadsheets, SheetsService.Scope.Drive, SheetsService.Scope.DriveFile };
    private DriveService _driveService = null!;
    private SheetsService _sheetsService = null!;

    public GoogleConnector(IOptions<GoogleOptions> options) => _options = options.Value;

    static readonly DateTime DateEpoch = new DateTime(1899, 12, 30);

    IList<object?> GoogleSheetRow(IEnumerable<object?> items, int size)
    {
        return Go().ToList();

        IEnumerable<object?> Go()
        {
            var index = 0;
            foreach (var item in items)
            {
                if (item == null)
                    yield return null;
                else if (item is DateTime dtValue)
                    yield return (dtValue - DateEpoch).TotalDays;
                else if (item is DateTimeOffset dtoValue)
                    yield return (dtoValue - DateEpoch).TotalDays;
                else
                    yield return item;
                index++;
            }
            for (var i = index; i < size; i++)
                yield return null;
        }
    }

    public static string ColumnLabel(int column)
    {
        var columnLabel = string.Empty;

        while (column > 0)
        {
            int modulo = (column - 1) % 26;
            columnLabel = Convert.ToChar('A' + modulo).ToString() + columnLabel;
            column = (column - modulo) / 26;
        }

        return columnLabel;
    }

    public async Task Connect()
    {
        using var stream = new FileStream(_options.AuthTokenPath!, FileMode.Open, FileAccess.Read);

        var credential = (await GoogleCredential.FromStreamAsync(stream, CancellationToken.None))
            .CreateScoped(Scopes)
            .CreateWithUser(_options.UserName)
            .UnderlyingCredential as ServiceAccountCredential;

        // This explictly does not work: ServiceAccountCredential.FromServiceAccountData(stream)

        var initialize = new BaseClientService.Initializer()
        {
            ApiKey = _options.SheetsApiKey,
            ApplicationName = _options.ApplicationName,
            HttpClientInitializer = credential
        };

        _driveService = new DriveService(initialize);
        _sheetsService = new SheetsService(initialize);

        // Create a new one: 
        // await sheetsService.Spreadsheets.Create(new Spreadsheet()).ExecuteAsync()
        // Console.WriteLine(workbook.SpreadsheetUrl);
    }

    public async Task Export(params DtTable[] tables)
    {
        // TODO - Replace with MystwoodOptions.Admins
        await UpdatePermissions();

        var workbook = await _sheetsService.Spreadsheets.Get(_options.SpreadsheetId).ExecuteAsync();

        // Make sure all sheets are present
        var sheetNames = new HashSet<string>(workbook.Sheets.Select(x => x.Properties.Title));
        var missingSheets = tables.Select(x => x.Name).Except(sheetNames).ToList();
        if (missingSheets.Any())
            throw new Exception($"The following sheet(s) are missing: {string.Join(", ", missingSheets)}");

        ValueRange BuildRange(DtTable table)
        {
            var columnCount = 26;
            while (table.Columns.Length + 6 > columnCount)
                columnCount += 26;

            return new ValueRange()
            {
                Range = $"{table.Name}!A:{ColumnLabel(columnCount)}",
                Values = new IList<object?>[] { GoogleSheetRow(table.Columns.Select(x => x.Name), columnCount) }
                    .Concat(table.Rows.Select(x => GoogleSheetRow(x, columnCount)).ToList())
                .ToList()
            };
        }

        var updateRequest = _sheetsService.Spreadsheets.Values.BatchUpdate(new BatchUpdateValuesRequest
        {
            ValueInputOption = "raw",
            ResponseDateTimeRenderOption = "SERIAL_NUMBER",
            Data = tables.Select(x => BuildRange(x)).ToList()
        }, _options.SpreadsheetId);
        var ranges = await updateRequest.ExecuteAsync();
    }

    public async Task<IEnumerable<DtTable>> Import(params string[] tableNames)
    {
        var getRequest = _sheetsService.Spreadsheets.Values.BatchGet(_options.SpreadsheetId);
        getRequest.Ranges = new Repeatable<string>(tableNames.Select(x => $"{x}!A:ZZ"));
        var ranges = await getRequest.ExecuteAsync();

        var tables = new List<DtTable>();
        foreach (var range in ranges.ValueRanges)
        {
            tables.Add(new DtTable
            {
                Name = range.Range[..range.Range.IndexOf('!')],
                Columns = range.Values[0].Select(x => new DtColumn(x?.ToString() ?? "Unnamed", DtType.Text)).ToArray(),
                Rows = range.Values.Skip(1).Select(x => x.ToArray()).ToList()
            });
        }

        return tables;
    }

    private async Task UpdatePermissions()
    {
        var request = _driveService.Permissions.List(_options.SpreadsheetId);
        request.Fields = "*";
        var permissions = await request.ExecuteAsync();
        var emails = permissions.Permissions.Select(x => x.EmailAddress).ToList();
        await AddPermission(emails, "acrion@gmail.com");
    }

    private async Task AddPermission(List<string> emails, string adminEmail)
    {
        if (emails.Any(x => x?.Equals(adminEmail, StringComparison.InvariantCultureIgnoreCase) == true))
            return;

        await _driveService.Permissions.Create(new Permission()
        {
            Type = "user",
            Role = "writer",
            EmailAddress = "acrion@gmail.com"
        }, _options.SpreadsheetId).ExecuteAsync();
    }
}

namespace Mystwood.Landing.DataPorting;

public enum DtType
{
    Text,
    Integer,
    DateOnly,
    DateTime,
    Boolean
}

public record DtColumn(string Name, DtType Type);

public class DtTable
{
    public string Name { get; set; } = "";

    public DtColumn[] Columns { get; set; } = Array.Empty<DtColumn>();

    public IEnumerable<object?[]> Rows { get; set; } = Array.Empty<object?[]>();

    public IEnumerable<Dictionary<string, object?>> GetRows()
    {
        foreach (var row in Rows)
        {
            yield return Columns
                .Select((value, index) => new
                {
                    Name = value.Name,
                    Value = index < row.Length ? row[index] : null
                })
                .ToDictionary(x => x.Name, x => x.Value);
        }
    }
}

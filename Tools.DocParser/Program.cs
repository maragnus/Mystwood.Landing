// See https://aka.ms/new-console-template for more information

using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

await DoOccupations("Enhancement");
await DoSkills();

await DoAdvDis("adv", "Advantage");
await DoAdvDis("dis", "Disadvantage");

async Task DoAdvDis(string type, string typeName)
{
    using var reader = new StreamReader($"{type}.txt");
    using var writer = new StreamWriter($"{type}.out.txt");

    while (!reader.EndOfStream)
    {
        var name = (await reader.ReadLineAsync())!.Trim();
        var parts = Regex.Match(name, @"(.+) \(([^)]+)\)");
        name = parts.Groups[1].Value;
        var levels = parts.Groups[2].Value.Split(',');

        var description = await ReadToBlankLine(reader);
        var isPhysical = name.StartsWith('*');

        if (isPhysical)
            name = name.Substring(1);

        foreach (var level in levels)
        {
            await writer.WriteAsync($@".With{typeName}(""{name} {level.Trim()}""");
            if (isPhysical)
                await writer.WriteAsync($@", isPhysical: true");
            await writer.WriteLineAsync($@", description: {Stringize(description)})");
        }

    }
}

string Stringize(string description) =>
    description.Contains('"')
        ? $"@\"{description.Replace("\"", "\"\"")}\""
        : $"\"{description}\"";

async Task DoOccupations(string type)
{
    using var reader = new StreamReader($"occupations-{type}.txt");
    using var writer = new StreamWriter("occupations.out.txt");

    while (!reader.EndOfStream)
    {
        var name = (await reader.ReadLineAsync())!.Trim();

        if (!string.IsNullOrWhiteSpace(await reader.ReadLineAsync()))
            throw new Exception("should be blank");

        var skills = await ReadToBlankLine(reader);
        var description = await ReadToBlankLine(reader);
        var requirements = (string?)null;
        if (description.StartsWith("Require"))
        {
            requirements = description;
            description = await ReadToBlankLine(reader);
        }

        await writer.WriteAsync($@".WithOccupation(OccupationType.{type}, ""{name}"", ""{skills}""");
        if (requirements != null)
            await writer.WriteAsync($@", requirements: {Stringize(requirements)}");
        await writer.WriteLineAsync($@", description: {Stringize(description)})");
    }
}

async Task<string> ReadToBlankLine(StreamReader reader)
{
    var sb = new StringBuilder();
    while (!reader.EndOfStream)
    {
        var line = await reader.ReadLineAsync();
        if (string.IsNullOrWhiteSpace(line))
            break;
        sb.Append(line.Trim()).Append(' ');
    }

    return sb.ToString().TrimEnd();
}

async Task DoSkills()
{
    using var reader = new StreamReader("skills.txt");
    using var writer = new StreamWriter("skills.out.txt");

    var text = await reader.ReadToEndAsync();

    var items = Regex.Split(text, @"([A-Z][a-z]+.*\[.*\])", System.Text.RegularExpressions.RegexOptions.Compiled);

    for (var i = 1; i < items.Length; i += 2)
    {
        var parts = Regex.Match(items[i].Trim(), @"(\w[^[]+) \[(.*?)(?:, (.*?) MS)?(?:, (.*?))?\]");
        var name = parts.Groups[1].Value;
        var skillClass = parts.Groups.Count > 2 ? parts.Groups[2].Value : "";
        var cost = parts.Groups.Count > 3 ? parts.Groups[3].Value : "";
        var skillRank = parts.Groups.Count > 4 ? parts.Groups[4].Value : "";
        var description = items[i + 1].ReplaceLineEndings(" ").Trim();

        // Reduce to the first 4 sentences
        var shortDesc = description.Substring(0, NthOccurence(description, '.', 4));

        await writer.WriteAsync($@".WithOrdinarySkill(""{name}"", SkillClass.{skillClass}");
        if (cost != "")
            await writer.WriteAsync($", {cost}");
        if (skillRank != "")
            await writer.WriteAsync($", SkillRank.{skillRank}");

        await writer.WriteLineAsync($@", description: {Stringize(shortDesc)})");
    }
}

int NthOccurence(string s, char t, int n) =>
    s.TakeWhile(c => (n -= (c == t ? 1 : 0)) > 0).Count();

//var regex = new System.Text.RegularExpressions.Regex();

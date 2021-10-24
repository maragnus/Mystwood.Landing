// See https://aka.ms/new-console-template for more information

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using DnsClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Mongo2Go;
using MongoDB.Driver;
using Mystwood.Landing.Models;
using Mystwood.Landing.Data;
using Mystwood.Landing.Data.Mock;
using Newtonsoft.Json.Linq;

await using(var file = new StreamWriter($"gifts.ts"))
{
    await file.WriteLineAsync("var gifts = ");
    await file.FlushAsync();
    await JsonSerializer.SerializeAsync(file.BaseStream, ReferenceData.Gifts);
    // var traits = await db!.Traits.Find(i=>i.Type == TraitType.Gift).As<GiftTrait>().ToListAsync();
    // foreach (var trait in traits)
    // {
    // }
}


var switches = new Dictionary<string, string>() {{"-output", "OutputPath"}};
var builder = new ConfigurationBuilder();
builder.AddCommandLine(args, switches);
var config = builder.Build();

var services = new ServiceCollection();
services.AddLogging(logging => logging.AddConsole());
var serviceProvider = services.BuildServiceProvider();

using var mongo = MongoDbRunner.Start(logger: serviceProvider.GetRequiredService<ILogger<MongoDbRunner>>(), additionalMongodArguments: "--quiet");

var dbOptions = new OptionsWrapper<MystwoodDatabaseOptions>(new MystwoodDatabaseOptions()
{
    ApplicationName = "MystwoodLanding.xunit",
    DatabaseName = "mwlxunit",
    ConnectionString = mongo.ConnectionString
});
using var db = new MystwoodDatabase(dbOptions, serviceProvider.GetRequiredService<ILogger<MystwoodDatabase>>());

var seeder = new MystwoodDatabaseSeeder(db);
await seeder.SeedReferenceData();

var options = new JsonSerializerOptions() {WriteIndented = true, Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }};

async Task ExportTrait<TTrait>(Func<TTrait, object> project) where TTrait : Trait, new()
{
    var t = new TTrait();
    var traits = await db!.Traits.Find(i=>i.Type == t.Type).As<TTrait>().ToListAsync();
    await using var file = new FileStream($"{t.Type}.json", FileMode.Create, FileAccess.Write);
    await JsonSerializer.SerializeAsync(file, traits.Select(project), options);
}

var skills = (await db!.Traits.Find(i => i.Type == TraitType.Skill).As<SkillTrait>().ToListAsync())
    .ToDictionary(i => i.TraitId);

await ExportTrait<OccupationTrait>((trait) => new
{
    title = trait.Name,
    requirement = trait.Requirement,
    skills = trait.Skills.Select(i=> 
    {
        var (name, rank) = TraitsBuilder.ExtractName(i);
        return new {name, rank, title = i};
    }),
    type = $"OccupationType.{trait.OccupationType.ToString()}",
});

await ExportTrait<SkillTrait>((trait) => 
{
    var (name, rank) = TraitsBuilder.ExtractName(trait.Name);

    return new {
        name = name,
        title = trait.Name,
        @class = trait.SkillClass.ToString(), 
        ranks = trait.Rank.ToString(), 
        cost = trait.Cost,
    };
});

await ExportTrait<AdvantageTrait>((trait) => new
{
    name = trait.TraitId,
    title = trait.Name,
    groupName= trait.GroupName,
    groupRank = trait.GroupRank,
    physical = trait.IsPhysical,
});

await ExportTrait<DisadvantageTrait>((trait) => new
{
    name = trait.TraitId,
    title = trait.Name,
    groupName= trait.GroupName,
    groupRank = trait.GroupRank,
    physical = trait.IsPhysical,
});


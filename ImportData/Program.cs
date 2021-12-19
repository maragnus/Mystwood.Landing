using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Internal;
using Mystwood.Landing;
using Mystwood.Landing.Data;
using Mystwood.Landing.DataPorting;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddUserSecrets<ApplicationDbContext>()
    .Build();

var services = new ServiceCollection();

services.AddSingleton<ISystemClock, SystemClock>();

services.Configure<GoogleOptions>(configuration.GetSection(GoogleOptions.SectionName));

services.AddSingleton<IDataConnector, GoogleConnector>();
services.AddSingleton<DataPorting>();

services.AddDbContext<ApplicationDbContext>(o => o
    .UseSqlServer(configuration["ConnectionStrings:ApplicationDb"]));

var serviceProvider = services.BuildServiceProvider();

var dataPorting = serviceProvider.GetRequiredService<DataPorting>();

//await dataPorting.Export();
await dataPorting.Import();

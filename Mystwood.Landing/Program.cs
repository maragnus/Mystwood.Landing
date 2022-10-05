global using System;
global using System.Threading;
global using System.Threading.Tasks;
global using System.Collections.Generic;
global using System.Linq;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Internal;
using Mystwood.Landing;
using Mystwood.Landing.Data;
using Mystwood.Landing.LarpServices;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc(o =>
{
    o.EnableDetailedErrors = true;
});

builder.Services.AddCors(cors =>
{
    cors.AddDefaultPolicy(policy => policy
        .AllowAnyMethod()
        .AllowAnyOrigin()
        .AllowAnyHeader());
    cors.AddPolicy("GrpcCors", policy => policy
        .WithMethods("POST", "OPTIONS")
        .AllowAnyHeader()
        .WithOrigins("https://localhost:5002", "https://mystwoodlanding.azurewebsites.net")
        .WithExposedHeaders("Grpc-Status", "Grpc-Message"));
});

builder.Services.AddSingleton<ISystemClock, SystemClock>();

builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection(SmtpOptions.SectionName));
builder.Services.Configure<MystwoodOptions>(builder.Configuration.GetSection(MystwoodOptions.SectionName));
builder.Services.AddScoped<IEmailManager, EmailManager>();

builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<ITokenManager, TokenManager>();
builder.Services.AddScoped<ICharacterManager, CharacterManager>();
builder.Services.AddScoped<IEventManager, EventManager>();

builder.Services.AddDbContext<ApplicationDbContext>(o => o
    .UseSqlServer(builder.Configuration["ConnectionStrings:ApplicationDb"]));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();
app.UseGrpcWeb();

app.MapFallbackToFile("index.html"); ;
app.MapGrpcService<LarpAccountService>()
    .EnableGrpcWeb()
    .RequireCors("GrpcCors")
    .AllowAnonymous();
app.MapGrpcService<LarpAuthenticationService>()
    .EnableGrpcWeb()
    .RequireCors("GrpcCors")
    .AllowAnonymous();
app.MapGrpcService<LarpManageService>()
    .EnableGrpcWeb()
    .RequireCors("GrpcCors")
    .AllowAnonymous();

app.Run();

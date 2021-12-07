using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Mystwood.Landing;
using Mystwood.Landing.Data;
using Mystwood.Landing.Services;

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

builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection(SmtpOptions.SectionName));
builder.Services.AddScoped<IEmailManager, EmailManager>();

builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<ITokenManager, TokenManager>();
builder.Services.AddSingleton<ISystemClock, SystemClock>();
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
app.MapGrpcService<LarpService>()
    .EnableGrpcWeb()
    .RequireCors("GrpcCors")
    .AllowAnonymous();

app.Run();

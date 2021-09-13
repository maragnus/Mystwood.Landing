using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Mystwood.Landing.Data;
using Mystwood.Landing.MwlApi.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<MystwoodDatabaseOptions>(builder.Configuration.GetSection(MystwoodDatabaseOptions.SectionName));
builder.Services.AddSingleton<IMystwoodDatabase, MystwoodDatabase>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Mystwood Landing", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "JWT access_token from api/token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {{
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        Array.Empty<string>()
    }});
});

var tokenProvider = new RsaJwtTokenProvider("issuer", "audience", "mykeyname");
builder.Services.AddSingleton<ITokenProvider>(tokenProvider);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = tokenProvider.GetValidationParameters();
    });

// This is for the [Authorize] attributes.
builder.Services.AddAuthorization(auth =>
{
    auth.DefaultPolicy = new AuthorizationPolicyBuilder()
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build();
});

var app = builder.Build();

await app.Services.GetRequiredService<IMystwoodDatabase>().HealthCheckAsync();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mystwood Landing v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

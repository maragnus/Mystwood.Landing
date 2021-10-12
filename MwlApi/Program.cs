using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Mystwood.Landing.Data;
using Mystwood.Landing.MwlApi.Authorization;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddJwtAuthentication(builder.Configuration);

var app = builder.Build();

await app.Services.GetRequiredService<ITokenProvider>().CreateSecurityKey();

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

using Mystwood.Landing.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<MystwoodDatabaseOptions>(builder.Configuration.GetSection(MystwoodDatabaseOptions.SectionName));
builder.Services.AddSingleton<IMystwoodDatabase, MystwoodDatabase>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Mystwood Landing", Version = "v1" });
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

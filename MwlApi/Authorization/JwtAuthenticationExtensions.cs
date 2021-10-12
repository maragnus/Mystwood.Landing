using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Mystwood.Landing.MwlApi.Authorization;

public static class JwtAuthenticationExtensions
{
    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<RsaJwtTokenProviderOptions>(configuration.GetSection(RsaJwtTokenProviderOptions.SectionName));
        services.AddSingleton<RsaJwtTokenProvider>();
        services.AddSingleton<ITokenProvider>(sp => sp.GetRequiredService<RsaJwtTokenProvider>());
        services.ConfigureOptions<ConfigureJwtBearerOptions>();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, configureOptions: null);

        // Enable AuthorizeAttribute
        services.AddAuthorization(auth =>
        {
            auth.DefaultPolicy = new AuthorizationPolicyBuilder()
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
        });

        return services;
    }
}

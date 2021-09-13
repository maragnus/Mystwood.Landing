using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace Mystwood.Landing.MwlApi.Authorization;

public class ConfigureJwtBearerOptions : IConfigureNamedOptions<JwtBearerOptions>
{
    private readonly RsaJwtTokenProvider _tokenProvider;

    public ConfigureJwtBearerOptions(RsaJwtTokenProvider tokenProvider) =>
        _tokenProvider = tokenProvider;

    public void Configure(JwtBearerOptions options) =>
        Configure(string.Empty, options);

    public void Configure(string name, JwtBearerOptions options)
    {
        if (name == JwtBearerDefaults.AuthenticationScheme)
        {
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = _tokenProvider.GetValidationParameters();
        }
    }
}

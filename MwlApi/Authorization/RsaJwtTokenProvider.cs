
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.MwlApi.Authorization;

public interface ITokenProvider
{
    string CreateToken(ApplicationUser user, DateTime expiry);

    TokenValidationParameters GetValidationParameters();
    Task CreateSecurityKey();
}

// Source: https://stackoverflow.com/a/45806995/341536

public record RsaJwtTokenProviderOptions
{
    public const string SectionName = "JwtTokenProvider";
    public string? Issuer { get; set; }
    public string? Audience { get; set; }
    public string? KeyName { get; set; }
}


public class RsaJwtTokenProvider : ITokenProvider
{
    private readonly string _algorithm;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly string _keyName;
    private readonly IMystwoodDatabase _db;
    private JsonWebKey? _key;

    public RsaJwtTokenProvider(IOptions<RsaJwtTokenProviderOptions> options, IMystwoodDatabase db)
    {
        _algorithm = SecurityAlgorithms.RsaSha256Signature;
        _issuer = options.Value.Issuer ?? "UnspecifiedIssuer";
        _audience = options.Value.Audience ?? "UnspecifiedAudience";
        _keyName = options.Value.KeyName ?? nameof(RsaJwtTokenProvider);
        _db = db;
    }

    public async Task CreateSecurityKey()
    {
        var json = await _db.GetOrCreateValue(_keyName, (name) =>
        {
            var rsaSecurityKey = new RsaSecurityKey(RSA.Create(2048));
            var jsonWebKey = JsonWebKeyConverter.ConvertFromRSASecurityKey(rsaSecurityKey);
            return JsonSerializer.Serialize(jsonWebKey);
        });

        _key = JsonWebKey.Create(json);
    }

    public string CreateToken(ApplicationUser user, DateTime expiry)
    {
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        ClaimsIdentity identity = new ClaimsIdentity(new GenericIdentity(user.UserName ?? "Undefined", "jwt"));

        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.PlayerId ?? ""));

        SecurityToken token = tokenHandler.CreateJwtSecurityToken(new SecurityTokenDescriptor
        {
            Audience = _audience,
            Issuer = _issuer,
            SigningCredentials = new SigningCredentials(_key, _algorithm),
            Expires = expiry.ToUniversalTime(),
            Subject = identity
        });

        return tokenHandler.WriteToken(token);
    }

    public TokenValidationParameters GetValidationParameters()
    {
        return new TokenValidationParameters
        {
            IssuerSigningKey = _key,
            ValidAudience = _audience,
            ValidIssuer = _issuer,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(0) // Identity and resource servers are the same.
        };
    }
}

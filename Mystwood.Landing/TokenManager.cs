using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Mystwood.Landing.Data;

namespace Mystwood.Landing
{

    public enum ValidationStatus
    {
        Unspecified,
        Success,
        Expired,
        Invalid,
        Consumed
    }

    public record ValidationStatusResult(ValidationStatus Status)
    {
        public bool IsSuccessful => Status == ValidationStatus.Success;
    }

    public interface ITokenManager
    {
        Task<string> CreateUserCode(string source, TimeSpan duration, string? endPoint = null);
        Task<ValidationStatusResult> ValidateUserCode(string code, string source, string? endPoint = null);
    }

    public class TokenManager : ITokenManager
    {
        private readonly ApplicationDbContext _db;
        private readonly ISystemClock _clock;

        public TokenManager(ApplicationDbContext db, ISystemClock clock)
        {
            _db = db;
            _clock = clock;
        }

        public async Task<string> CreateUserCode(string source, TimeSpan duration, string? endPoint = null)
        {
            char[] token = RandomReadableString(6);

            var now = _clock.UtcNow;
            var code = new string(token);

            _db.Tokens.Add(new Token
            {
                Source = source,
                Code = code,
                Created = now,
                Expires = now + duration,
                CreatedEndPoint = endPoint
            });

            await _db.SaveChangesAsync();

            return code;
        }

        private static char[] RandomReadableString(int length)
        {
            string chars = "23456789CEFHKLPTX";
            var token = new char[length];
            for (int i = 0; i < length; i++)
                token[i] = chars[Random.Shared.Next(0, chars.Length)];
            return token;
        }

        public async Task<ValidationStatusResult> ValidateUserCode(string code, string source, string? endPoint = null)
        {
            var token = await _db.Tokens.FirstOrDefaultAsync(x => x.Code == code && x.Source == source);
            if (token == null)
                return new ValidationStatusResult(ValidationStatus.Invalid);

            var now = _clock.UtcNow;

            if (token.Consumed != null)
                return new ValidationStatusResult(ValidationStatus.Consumed);

            if (token.Expires <= now)
                return new ValidationStatusResult(ValidationStatus.Expired);

            token.Consumed = now;
            token.ConsumedEndPoint = endPoint;
            await _db.SaveChangesAsync();

            return new ValidationStatusResult(ValidationStatus.Success);
        }
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Mystwood.Landing.Data;

namespace Mystwood.Landing
{

    public record UserProfile(
        string? Name,
        string[] Emails,
        string? Phone,
        string? Location
    );

    public interface IUserManager
    {
        Task<string> CreateSessionId(string email, string peer);
        Task<bool> VerifySessionId(string sessionId);
        Task<UserProfile> GetProfile(string sessionId);
        Task<bool> ValidateAccount(string email, string peer);

        Task SetName(string sessionId, string newValue);
        Task SetLocation(string sessionId, string newValue);
        Task SetPhone(string sessionId, string newValue);
        Task AddEmail(string sessionId, string email);
        Task RemoveEmail(string sessionId, string email);
    }

    public class UserManager : IUserManager
    {
        private readonly ApplicationDbContext _db;
        private readonly ISystemClock _clock;

        public UserManager(ApplicationDbContext db, ISystemClock systemClock)
        {
            _db = db;
            _clock = systemClock;
        }

        private async Task UpdateProfile(string sessionId, Action<Account> updateAction)
        {
            var account = await _db.Accounts
              .Include(x => x.EmailAddresses)
              .FirstOrDefaultAsync(x => x.Sessions!.Any(s => s.Id == sessionId));

            if (account == null)
                throw new UserManagerException("Session ID not found");

            updateAction(account);

            // PS - this is stupid, there should be individual delete and add email buttons

            await _db.SaveChangesAsync();
        }

        public async Task AddEmail(string sessionId, string email)
        {
            await UpdateProfile(sessionId, account =>
            {
                var normalized = email.Trim().ToUpper();
                if (account.EmailAddresses!.Any(s => s.EmailNormalized == normalized))
                    return;

                account.EmailAddresses!.Add(new EmailAddress
                {
                    Email = email,
                    EmailNormalized = email.ToUpper()
                });
            });
        }
        public async Task RemoveEmail(string sessionId, string email)
        {
            await UpdateProfile(sessionId, account =>
            {
                if (account.EmailAddresses!.Count == 1)
                    throw new UserManagerException("Cannot delete last email address");

                var normalized = email.Trim().ToUpper();
                var item = account.EmailAddresses!.FirstOrDefault(s => s.EmailNormalized == normalized);
                if (item != null)
                    account.EmailAddresses!.Remove(item);
            });
        }

        public async Task<string> CreateSessionId(string email, string peer)
        {
            var account = await _db.Accounts
                .FirstOrDefaultAsync(x => x.EmailAddresses!.Any(ea => ea.EmailNormalized == email.ToUpper()));

            if (account?.IsValid == false)
                throw new UserManagerException("Account is not valid");

            // Create a new account, as needed
            if (account == null)
            {
                account = new Account
                {
                    IsValid = true,
                    Name = "Unnamed",
                    EmailAddresses = new List<EmailAddress>() {
                        new EmailAddress { EmailNormalized = email.ToUpper(), Email = email }
                    },
                    Created = _clock.UtcNow
                };
                _db.Accounts.Add(account);
            }

            var code = Guid.NewGuid().ToString("N");
            var now = _clock.UtcNow;

            _db.Sessions.Add(new Data.Session
            {
                Id = code,
                Created = now,
                Account = account,
                Accessed = now
            });
            await _db.SaveChangesAsync();

            return code;
        }

        public async Task<UserProfile> GetProfile(string sessionId)
        {
            var account = await _db.Accounts
                .Include(x => x.EmailAddresses)
                .FirstOrDefaultAsync(x => x.Sessions!.Any(s => s.Id == sessionId));

            if (account == null)
                throw new UserManagerException("Session ID not found");

            return new UserProfile(
                account.Name,
                account.EmailAddresses!.Select(x => x.Email).ToArray(),
                account.PhoneNumber ?? "",
                account.Location ?? ""
            );
        }

        public async Task SetLocation(string sessionId, string newValue)
        {
            await UpdateProfile(sessionId, account =>
            {
                account.Location = newValue.Trim();
            });
        }

        public async Task SetName(string sessionId, string newValue)
        {
            await UpdateProfile(sessionId, account =>
            {
                account.Name = newValue.Trim();
            });
        }

        public async Task SetPhone(string sessionId, string newValue)
        {
            await UpdateProfile(sessionId, account =>
            {
                account.PhoneNumber = newValue.Trim();
            });
        }

        public async Task<bool> ValidateAccount(string email, string peer)
        {
            var account = await _db.Accounts.FirstOrDefaultAsync(x => x.EmailAddresses!.Any(ea => ea.EmailNormalized == email.ToUpper()));

            return account?.IsValid ?? true;
        }

        public async Task<bool> VerifySessionId(string sessionId)
        {
            var session = await _db.Sessions
                .FirstOrDefaultAsync(x => x.Id == sessionId && x.Account.IsValid == true);

            if (session == null)
                return false;

            // Update last accessed time once per day
            var now = _clock.UtcNow;
            if (session.Accessed == null
                || session.Accessed.Value.UtcDateTime.Date < now.UtcDateTime.Date)
            {
                session.Accessed = now;
                await _db.SaveChangesAsync();
            }

            return true;
        }
    }
}

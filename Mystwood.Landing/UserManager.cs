﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Options;
using Mystwood.Landing.Data;
using Mystwood.Landing.GrpcLarp;
using Account = Mystwood.Landing.GrpcLarp.Account;
using DbAccount = Mystwood.Landing.Data.Account;

namespace Mystwood.Landing
{

    public record UserProfile(
        string? Name,
        string[] Emails,
        string? Phone,
        string? Location,
        bool? IsAdmin,
        bool? IsValid,
        string Notes,
        DateTimeOffset Created
    );

    public interface IUserManager
    {
        Task<string> CreateSessionId(string email, string peer);
        Task<Account> GetAccount(int accountId);
        Task<int?> VerifySessionId(string sessionId);
        Task<int?> VerifyAdminSessionId(string sessionId);
        Task<(int? accountId, bool isAdmin)> VerifyOptionalAdminSessionId(string sessionId);
        Task<UserProfile> GetProfile(int accountId);
        Task<IEnumerable<Account>> QueryAccounts(string query);
        Task<bool> ValidateAccount(string email, string peer);

        Task SetName(int accountId, string newValue);
        Task SetLocation(int accountId, string newValue);
        Task SetPhone(int accountId, string newValue);
        Task AddEmail(int accountId, string email);
        Task RemoveEmail(int accountId, string email);
        Task SetAdmin(int accountId, bool isAdmin);
        Task Set(Account profile);
    }

    public class UserManager : IUserManager
    {
        private readonly ApplicationDbContext _db;
        private readonly ISystemClock _clock;
        private readonly MystwoodOptions _options;

        public UserManager(ApplicationDbContext db, ISystemClock systemClock, IOptions<MystwoodOptions> options)
        {
            _db = db;
            _clock = systemClock;
            _options = options.Value;
        }

        private async Task UpdateProfile(int accountId, Action<DbAccount> updateAction)
        {
            var account = await _db.Accounts
              .Include(x => x.EmailAddresses)
              .FirstOrDefaultAsync(x => x.Id == accountId);

            if (account == null)
                throw new UserManagerException("Session ID not found");

            updateAction(account);

            // PS - this is stupid, there should be individual delete and add email buttons

            await _db.SaveChangesAsync();
        }

        public async Task AddEmail(int accountId, string email)
        {
            await UpdateProfile(accountId, account =>
            {
                var normalized = email.Trim().ToUpper();
                if (account.EmailAddresses.Any(s => s.EmailNormalized == normalized))
                    return;

                account.EmailAddresses.Add(new EmailAddress
                {
                    Email = email,
                    EmailNormalized = email.ToUpper()
                });
            });
        }
        public async Task RemoveEmail(int accountId, string email)
        {
            await UpdateProfile(accountId, account =>
            {
                if (account.EmailAddresses.Count == 1)
                    throw new UserManagerException("Cannot delete last email address");

                var normalized = email.Trim().ToUpper();
                var item = account.EmailAddresses.FirstOrDefault(s => s.EmailNormalized == normalized);
                if (item != null)
                    account.EmailAddresses.Remove(item);
            });
        }

        public async Task<string> CreateSessionId(string email, string peer)
        {
            email = email.Trim();

            var account = await _db.Accounts
                .Include(x => x.EmailAddresses)
                .FirstOrDefaultAsync(x => x.EmailAddresses.Any(ea => ea.EmailNormalized == email.ToUpper()));

            if (account?.IsValid == false)
                throw new UserManagerException("Account is not valid");

            // Create a new account, as needed
            if (account == null)
            {
                account = new DbAccount
                {
                    IsValid = true,
                    Name = "Unnamed",
                    EmailAddresses = new List<EmailAddress>() {
                        new EmailAddress { EmailNormalized = email.ToUpper(), Email = email }
                    },
                    IsAdmin = _options.Admins.Contains(email),
                    Created = _clock.UtcNow
                };
                _db.Accounts.Add(account);
            }

            var code = Guid.NewGuid().ToString("N");
            var now = _clock.UtcNow;

            var isAdmin = _options.Admins.Select(x => x.ToUpper()).Intersect(account.EmailAddresses.Select(x => x.EmailNormalized)).Any();
            if (account.IsAdmin != isAdmin)
                account.IsAdmin = isAdmin;

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

        public async Task<UserProfile> GetProfile(int accountId)
        {
            var account = await _db.Accounts
                .Include(x => x.EmailAddresses)
                .FirstOrDefaultAsync(x => x.Id == accountId)
                ?? throw new UserManagerException("Account ID not found");

            return new UserProfile(
                account.Name,
                account.EmailAddresses.Select(x => x.Email).ToArray(),
                account.PhoneNumber ?? "",
                account.Location ?? "",
                account.IsAdmin ?? false,
                account.IsValid ?? true,
                account.Notes ?? "",
                account.Created!.Value
            );
        }

        public async Task SetLocation(int accountId, string newValue)
        {
            await UpdateProfile(accountId, account =>
            {
                account.Location = newValue.Trim();
            });
        }

        public async Task SetName(int accountId, string newValue)
        {
            await UpdateProfile(accountId, account =>
            {
                account.Name = newValue.Trim();
            });
        }

        public async Task SetPhone(int accountId, string newValue)
        {
            await UpdateProfile(accountId, account =>
            {
                account.PhoneNumber = newValue.Trim();
            });
        }

        public async Task<bool> ValidateAccount(string email, string peer)
        {
            var account = await _db.Accounts.FirstOrDefaultAsync(x => x.EmailAddresses.Any(ea => ea.EmailNormalized == email.ToUpper()));

            return account?.IsValid ?? true;
        }

        public async Task<int?> VerifySessionId(string sessionId)
        {
            var (accountId, _) = await VerifyOptionalAdminSessionId(sessionId);
            return accountId;

        }

        public async Task<int?> VerifyAdminSessionId(string sessionId)
        {
            var (accountId, isAdmin) = await VerifyOptionalAdminSessionId(sessionId);
            return !isAdmin ? null : accountId;

        }

        public async Task<(int? accountId, bool isAdmin)> VerifyOptionalAdminSessionId(string sessionId)
        {
            var session = await _db.Sessions
                .Where(x => x.Id == sessionId && x.Account.IsValid == true)
                .Select(x => new
                {
                    SessionId = x.Id,
                    Accessed = x.Accessed ?? DateTimeOffset.MinValue,
                    AccountId = x.AccountId,
                    IsAdmin = x.Account.IsAdmin!.Value
                })
                .SingleOrDefaultAsync();

            if (session == null)
                return (null, false);

            // Update last accessed time once per day
            var now = _clock.UtcNow;
            if (session.Accessed.UtcDateTime.Date < now.UtcDateTime.Date)
            {
                var s = new Session { Id = session.SessionId, Accessed = now };
                _db.Sessions.Attach(s);
                _db.Entry(s).Property(x => x.Accessed).IsModified = true;
                await _db.SaveChangesAsync();
            }

            return (session.AccountId, session.IsAdmin);
        }

        public async Task SetAdmin(int accountId, bool isAdmin)
        {
            var account = await _db.Accounts.SingleAsync(x => x.Id == accountId);
            if (account.IsAdmin == isAdmin)
                return;

            account.IsAdmin = isAdmin;
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Account>> QueryAccounts(string query)
        {
            query = query.ToUpper();

            // Match on Player Name, Email Address, Character Name
            var accounts =
                await _db.Accounts
                .AsNoTrackingWithIdentityResolution()
                .Include(x => x.EmailAddresses)
                .Where(x => x.IsValid == true)
                .Where(x =>
                    EF.Functions.Like(x.Name!.ToUpper(), $"%{query}%")
                    || x.EmailAddresses.Any(e => EF.Functions.Like(e.EmailNormalized, $"%{query}%"))
                    || x.Characters.Any(c => EF.Functions.Like(c.Name!.ToUpper(), $"%{query}%")))
                .ToListAsync();

            return await BuildProfile(accounts);
        }

        private async Task<IEnumerable<Account>> BuildProfile(List<DbAccount> accounts)
        {
            var liveCharacters =
                await _db.CharacterRevisions
                .Include(x => x.Character)
                .AsNoTrackingWithIdentityResolution()
                .Where(x => x.State == RevisionState.Live || x.State == RevisionState.Review)
                .ToListAsync();
            var characters =
                CharacterManager.ToCharacterData(liveCharacters)
                .ToLookup(x => x.AccountId);

            return accounts.Select(account =>
            {
                var profile = new Account
                {
                    AccountId = account.Id!.Value,
                    IsAdmin = account.IsAdmin == true,
                    Location = account.Location ?? "",
                    Name = account.Name ?? "",
                    Phone = account.PhoneNumber ?? ""
                };
                profile.Emails.AddRange(account.EmailAddresses
                    .Select(ea => new AccountEmail
                    {
                        Email = ea.Email,
                        Verified = false
                    }));
                profile.Characters.AddRange(characters[account.Id!.Value]);
                return profile;
            });
        }

        public async Task<Account> GetAccount(int accountId)
        {
            // Match on Player Name, Email Address, Character Name
            var accounts =
                await _db.Accounts
                .AsNoTrackingWithIdentityResolution()
                .Include(x => x.EmailAddresses)
                .Where(x => x.Id == accountId)
                .ToListAsync();

            return (await BuildProfile(accounts)).Single();
        }

        public Task Set(Account profile) => throw new NotImplementedException();
    }
}

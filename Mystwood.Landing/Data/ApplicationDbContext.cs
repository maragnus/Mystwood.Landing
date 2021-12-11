using Microsoft.EntityFrameworkCore;

namespace Mystwood.Landing.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Character>().HasIndex(x => x.AccountId);
        modelBuilder.Entity<CharacterRevision>().HasIndex(x => x.CharacterId);
        modelBuilder.Entity<CharacterRevisionEvent>().HasIndex(x => x.CharacterRevisionId);

    }

    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<EmailAddress> EmailAddresses { get; set; } = null!;
    public DbSet<Session> Sessions { get; set; } = null!;
    public DbSet<Token> Tokens { get; set; } = null!;
    public DbSet<Character> Characters { get; set; } = null!;
    public DbSet<CharacterRevision> CharacterRevisions { get; set; } = null!;
    public DbSet<CharacterRevisionEvent> CharacterRevisionEvents { get; set; } = null!;
}

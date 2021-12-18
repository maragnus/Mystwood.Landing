using Microsoft.EntityFrameworkCore;

namespace Mystwood.Landing.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Character>().HasIndex(x => x.AccountId);
        modelBuilder.Entity<Character>().HasOne(x => x.Account).WithMany(x => x.Characters).OnDelete(DeleteBehavior.Cascade).IsRequired();

        modelBuilder.Entity<CharacterRevision>().HasIndex(x => x.CharacterId);
        modelBuilder.Entity<CharacterRevision>().HasOne(x => x.Character).WithMany(x => x.CharacterRevisions).OnDelete(DeleteBehavior.Cascade).IsRequired();

        modelBuilder.Entity<CharacterRevisionEvent>().HasIndex(x => x.CharacterRevisionId);
        modelBuilder.Entity<CharacterRevisionEvent>().HasOne(x => x.CharacterRevision).WithMany(x => x.CharacterRevisionEvents).OnDelete(DeleteBehavior.Cascade).IsRequired();

        modelBuilder.Entity<AccountAttendance>().HasIndex(x => new { x.AccountId, x.EventId }).IsUnique();
        modelBuilder.Entity<AccountAttendance>().HasOne(x => x.Account).WithMany(x => x.AccountAttendances).OnDelete(DeleteBehavior.Cascade).IsRequired();
        modelBuilder.Entity<AccountAttendance>().HasOne(x => x.Event).WithMany(x => x.AccountAttendances).OnDelete(DeleteBehavior.Cascade).IsRequired();

        modelBuilder.Entity<CharacterAttendance>().HasIndex(x => new { x.CharacterId, x.EventId }).IsUnique();
        modelBuilder.Entity<CharacterAttendance>().HasOne(x => x.Character).WithMany(x => x.CharacterAttendances).OnDelete(DeleteBehavior.Cascade).IsRequired();
        modelBuilder.Entity<CharacterAttendance>().HasOne(x => x.Event).WithMany(x => x.CharacterAttendances).OnDelete(DeleteBehavior.Cascade).IsRequired();

        modelBuilder.Entity<AccountAttendanceUpdate>().HasOne(x => x.AccountAttendance).WithMany(x => x.AccountAttendanceUpdates).OnDelete(DeleteBehavior.Cascade).IsRequired();
    }

    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<EmailAddress> EmailAddresses { get; set; } = null!;
    public DbSet<Session> Sessions { get; set; } = null!;
    public DbSet<Token> Tokens { get; set; } = null!;
    public DbSet<Character> Characters { get; set; } = null!;
    public DbSet<CharacterRevision> CharacterRevisions { get; set; } = null!;
    public DbSet<CharacterRevisionEvent> CharacterRevisionEvents { get; set; } = null!;
    public DbSet<Event> Events { get; set; } = null!;
    public DbSet<AccountAttendance> AccountAttendances { get; set; } = null!;
    public DbSet<CharacterAttendance> CharacterAttendances { get; set; } = null!;
    public DbSet<AccountAttendanceUpdate> AccountAttendanceUpdate { get; set; } = null!;
}

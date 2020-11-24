using Crowdfund.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Crowdfund.Core.Data
{
    public class CrowdfundDbContext : DbContext
    {
        public readonly static string connectionString = "Server=tcp:localhost,1433;Initial Catalog=CrowdfundTesting;Persist Security Info=False;" +
                    "User ID=sa;Password=admin!@#123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(connectionString);
        }

        public CrowdfundDbContext(DbContextOptions<CrowdfundDbContext> options)
            : base(options)
        { }
        public CrowdfundDbContext()
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();

            modelBuilder.Entity<User>()
                .Property(c => c.FirstName)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(c => c.LastName)
                .IsRequired();

            modelBuilder.Entity<Project>();

            modelBuilder.Entity<Package>();

            // works on EF Core 5.0
            //modelBuilder.Entity<Order>().HasMany(o => o.Products).WitMany()

            // Many-to-many: works on EF Core 3.x
            modelBuilder.Entity<Funding>().HasKey(op => new { op.UserId, op.PackageId });
        }
    }
}

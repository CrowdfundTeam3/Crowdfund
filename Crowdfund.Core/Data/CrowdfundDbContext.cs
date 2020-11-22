using CrowdfundCORE.Models;
using Microsoft.EntityFrameworkCore;

namespace CrowdfundCORE.Data
{
    public class CrowdfundDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(
                    "Server=tcp:localhost,1433;Initial Catalog=CrowdfundCaseTest;Persist Security Info=False;" +
                    "User ID=sa;Password=admin!@#123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");
        }
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
            modelBuilder.Entity<Funding>().HasKey(op => new { op.UserId, op.PackageId});
        }
    }
}

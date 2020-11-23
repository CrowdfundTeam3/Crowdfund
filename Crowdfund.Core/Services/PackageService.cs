using Crowdfund.Core.Data;
using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using System;
using System.Collections.Generic;


namespace Crowdfund.Core.Services
{
    public class PackageService : IPackageService
    {
        private readonly CrowdfundDbContext dbContext;
        public PackageService(CrowdfundDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public PackageOptions AddPackageToProject(PackageOptions packageOptions)
        {
            Package package = new Package
            {
                Price = packageOptions.Price,
                Reward = packageOptions.Reward,
                ProjectId = packageOptions.ProjectId
            };

            dbContext.Add(package);
            dbContext.SaveChanges();
            return new PackageOptions
            {
                Id = package.Id,
                Price = package.Price,
                Reward = package.Reward,
                ProjectId = package.ProjectId
            };
        }

        public bool DeletePackageFromProject(int packageId)
        {
            Package package = dbContext.Set<Package>().Find(packageId);
            if (package == null) return false;
            dbContext.Remove(package);
            dbContext.SaveChanges();
            return true;
        }

        public List<PackageOptions> GetAllProjectPackages(int projectId)
        {
            throw new NotImplementedException();
        }
    }
}

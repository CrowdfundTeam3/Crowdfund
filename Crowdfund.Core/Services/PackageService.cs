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
            throw new NotImplementedException();
        }

        public List<PackageOptions> GetAllProjectPackages(int projectId)
        {
            throw new NotImplementedException();
        }
    }
}

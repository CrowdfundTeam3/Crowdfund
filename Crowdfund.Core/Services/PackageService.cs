using Crowdfund.Core.Data;
using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
            throw new NotImplementedException();
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

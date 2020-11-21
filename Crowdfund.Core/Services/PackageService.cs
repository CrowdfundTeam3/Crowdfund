using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using CrowdfundCORE.Options;
using CrowdfundCORE.Models;
using CrowdfundCORE.Data;
using CrowdfundCORE.Services;

namespace Crowdfund.Core.Services
{
    public class PackageService
    {
        public List<Package> GetAllProjectPackages(int projectId)
        {
            List<Package> packages = dbContext.Packages.ToList();
            return packages;
        }

        public bool DeletePackageFromProject(int packageId, int projectId)
        {
            Package package = dbContext.Packages.Find(id);
            if (package == null) return false;
            dbContext.Packages.Remove(package);
            return true;

        }

        public PackageOptions AddPackageToProject(PackageOptions packageOptions, int projectId)
        {
            product product = dbContext.Product.Find(productId);
            PackageOptions packageOptions = new PackageOptions
            {
                Package = package
            };
            dbContext.OrderProducts.Add(PackageOptions);
            dbContext.SaveChanges();
            return GetPackage(packageId);

        }

    }
}

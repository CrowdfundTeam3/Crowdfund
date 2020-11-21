using CrowdfundCORE.Data;
using CrowdfundCORE.Models;
using CrowdfundCORE.Options;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CrowdfundCORE.Services
{
    public interface IPackageService
    {
        List<PackageOptions> GetAllProjectPackages(int projectId);
        PackageOptions AddPackageToProject(PackageOptions packageOptions, int projectId);
        bool DeletePackageFromProject(int packageId, int projectId);
    }
}

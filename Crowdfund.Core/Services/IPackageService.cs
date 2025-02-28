﻿using Crowdfund.Core.Options;
using System.Collections.Generic;

namespace Crowdfund.Core.Services
{
    public interface IPackageService
    {
        List<PackageOptions> GetAllProjectPackages(int projectId);
        PackageOptions AddPackageToProject(PackageOptions packageOptions, int projectId);
        bool DeletePackageFromProject(int packageId);
    }
}

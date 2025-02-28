﻿using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CrowdFund.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private IPackageService packageService;
        public PackageController(IPackageService packageService)
        {
            this.packageService = packageService;
        }

        [HttpPost("project/{projectId}/")]
        public PackageOptions AddPackageToProject([FromForm] PackageOptions packageOptions, int projectId)
        {
            return packageService.AddPackageToProject(packageOptions, projectId);
        }

        [HttpDelete("{packageId}")]

        public bool DeletePackageFromProject(int packageId)
        {
            return packageService.DeletePackageFromProject(packageId);
        }

        [HttpGet("project/{projectId}")]
        public List<PackageOptions> GetAllProjectPackages(int projectId)
        {
            return packageService.GetAllProjectPackages(projectId);
        }
    }
}

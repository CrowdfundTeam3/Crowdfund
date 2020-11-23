using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public PackageOptions AddPackageToProject(PackageOptions PackageOption)
        {
            return packageService.AddPackageToProject(PackageOption);
        }
    }
}

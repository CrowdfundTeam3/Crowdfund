using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using CrowdFund.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CrowdFund.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IProjectService projectService;


        public HomeController(ILogger<HomeController> logger, IProjectService projectService)
        {
            _logger = logger;
            this.projectService = projectService;
        }



        public IActionResult Index()
        {
            List<ProjectOptions> projectOpts = projectService.GetAllProjects();
            ProjectModel projectModel = new ProjectModel
            {
                projectOptions = projectOpts
            };
            return View(projectModel);
        }

        public IActionResult Creator()
        {
            return View();
        }


        public IActionResult Funded()
        {

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}

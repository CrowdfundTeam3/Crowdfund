using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrowdFund.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService projectService;

        public ProjectController(IProjectService projectService)
        {
            this.projectService = projectService;
        }


        [HttpPost]
        public ProjectOptions CreateProject(ProjectOptions ProjectOption)
        {
            return projectService.CreateProject(ProjectOption);
        }

        [HttpDelete("{id}")]
        public bool DeleteProject(int id)
        {
            return projectService.DeleteProjectWithId(id);
        }

        [HttpGet("getall")]
        public List<ProjectOptions> GetAllProjects()
        {
            return projectService.GetAllProjects();
        }

        [HttpGet("bycreatorid/{id}")]
        public List<ProjectOptions> GetProjectsByCreatorId(int id)
        {
            return projectService.GetProjectsByCreatorId(id);
        }

    }
}

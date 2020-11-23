﻿using Crowdfund.Core.Options;
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

        [HttpGet("bycategory/{searchCategory}")]
        public List<ProjectOptions> GetProjectsByCategory(string searchCategory)
        {
            return projectService.GetProjectsByCategory(searchCategory);
        }

        [HttpGet("{id}")]
        public ProjectOptions GetProjectById(int id)
        {
            return projectService.GetProjectById(id);
        }

        [HttpGet("popular")]
        public List<ProjectOptions> GetMostPopularProjects()
        {
            return projectService.GetMostPopularProjects();
        }

        [HttpGet("search/{searchterm}")]
        public List<ProjectOptions> GetProjectsBySearchTerm(string searchterm)
        {
            return projectService.GetProjectsBySearchTerm(searchterm);
        }

        [HttpPut("{projectId}")]
        public ProjectOptions UpdateProject(int projectId, [FromBody] ProjectOptions projectOptions)
        {
            return projectService.UpdateProject(projectOptions, projectId);
        }

    }
}

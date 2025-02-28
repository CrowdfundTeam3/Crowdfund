﻿using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using CrowdFund.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CrowdFund.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService projectService;
        private readonly IWebHostEnvironment hostingEnvironment;

        public ProjectController(IProjectService projectService, IWebHostEnvironment environment)
        {
            this.projectService = projectService;
            hostingEnvironment = environment;
        }


        [HttpPost]
        public ProjectOptions CreateProject([FromForm] ProjectOptions projectOpts)
        {

            //if (projectWithPictureModel == null) return null;
            //var formFile = projectWithPictureModel.Photo;
            //var filename = projectWithPictureModel.Photo.FileName;
            //if (formFile.Length > 0)
            //{
            //    var filePath = Path.Combine(hostingEnvironment.WebRootPath, "uploadedimages", filename);
            //    using (var stream = System.IO.File.Create(filePath))
            //    {
            //        formFile.CopyTo(stream);
            //    }
            //}
            //var formFile2 = projectWithPictureModel.Video;
            //var filename2 = projectWithPictureModel.Video.FileName;
            //if (formFile2.Length > 0)
            //{
            //    var filePath2 = Path.Combine(hostingEnvironment.WebRootPath, "uploadedvideos", filename2);
            //    using (var stream = System.IO.File.Create(filePath2))
            //    {
            //        formFile2.CopyTo(stream);
            //    }
            //}


            ProjectOptions projectoptions = new ProjectOptions
            {
                Category = projectOpts.Category,
                CreatorId = projectOpts.CreatorId,
                CurrentFund = projectOpts.CurrentFund,
                Description = projectOpts.Description,
                Goal = projectOpts.Goal,
                Status = projectOpts.Status,
                TimesFunded = projectOpts.TimesFunded,
                Title = projectOpts.Title,
                Photo = projectOpts.Photo,
                Video = projectOpts.Video
            };

            return projectService.CreateProject(projectoptions);
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
        public ProjectOptions UpdateProject([FromForm] ProjectOptions projectOptions, int projectId)
        {
            return projectService.UpdateProject(projectOptions, projectId);
        }


        [HttpGet("backer/{id}")]
        public List<ProjectOptions> GetProjectsByBackerId(int id)
        {
            return projectService.GetProjectsByBackerId(id);
        }

    }
}

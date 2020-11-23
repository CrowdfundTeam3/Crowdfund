using Crowdfund.Core.Data;
using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Crowdfund.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly CrowdfundDbContext dbContext;
        public ProjectService(CrowdfundDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public ProjectOptions CreateProject(ProjectOptions projectOptions)
        {
            Project project = new Project
            {
                Title = projectOptions.Title,
                Description = projectOptions.Description,
                Category = projectOptions.Category,
                Photo = projectOptions.Photo,
                Video = projectOptions.Video,
                Status = projectOptions.Status,
                Goal = projectOptions.Goal,
                CurrentFund = projectOptions.CurrentFund,
                CreatorId = projectOptions.CreatorId,
                TimesFunded = projectOptions.TimesFunded
            };

            dbContext.Add(project);
            dbContext.SaveChanges();
            return new ProjectOptions
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Status = project.Status,
                Goal = project.Goal,
                CurrentFund = project.CurrentFund,
                CreatorId = project.CreatorId,
                TimesFunded = project.TimesFunded
            };
        }

        public bool DeleteProjectWithId(int id)
        {
            Project project = dbContext.Set<Project>().Find(id);
            if (project == null) return false;
            dbContext.Remove(project);
            dbContext.SaveChanges();
            return true;
        }

        public List<ProjectOptions> GetAllProjects()
        {
            throw new NotImplementedException();
        }

        public List<ProjectOptions> GetMostPopularProjects()
        {
            throw new NotImplementedException();
        }

        public ProjectOptions GetProjectById(int projectId)
        {
            throw new NotImplementedException();
        }

        public List<ProjectOptions> GetProjectsByBackerId(int backerId)
        {
            throw new NotImplementedException();
        }

        public List<ProjectOptions> GetProjectsByCategory(string category)
        {
            throw new NotImplementedException();
        }

        public List<ProjectOptions> GetProjectsByCreatorId(int creatorId)
        {
            throw new NotImplementedException();
        }

        public List<ProjectOptions> GetProjectsBySearchTerm(string searchTerm)
        {
            throw new NotImplementedException();
        }

        public ProjectOptions UpdateProject(ProjectOptions projectOptions, int id)
        {
            throw new NotImplementedException();
        }
    }
}

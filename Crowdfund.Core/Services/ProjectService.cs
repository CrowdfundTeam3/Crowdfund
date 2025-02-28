﻿using Crowdfund.Core.Data;
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
            var user = dbContext.Set<User>().Where(u => u.Id == projectOptions.CreatorId).Include(p => p.CreatedProjects).SingleOrDefault();
            var project = new Project()
            {
                CreatorId = projectOptions.CreatorId,
                Description = projectOptions.Description,
                Category = projectOptions.Category,
                Photo = projectOptions.Photo,
                Video = projectOptions.Video,
                Goal = projectOptions.Goal,
                Title = projectOptions.Title,
                Status = projectOptions.Status
            };
            user.CreatedProjects.Add(project);
            dbContext.Update(user);
            dbContext.SaveChanges();

            return new ProjectOptions()
            {
                Id = project.Id,
                CreatorId = project.CreatorId,
                CurrentFund = project.CurrentFund,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Goal = project.Goal,
                Title = project.Title,
                Status = project.Status,
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
            List<Project> projects = dbContext.Set<Project>().ToList();
            List<ProjectOptions> projectOption = new List<ProjectOptions>();

            projects.ForEach(projects => projectOption.Add(new ProjectOptions
            {
                Id = projects.Id,
                Title = projects.Title,
                Description = projects.Description,
                Category = projects.Category,
                Photo = projects.Photo,
                Video = projects.Video,
                Status = projects.Status,
                Goal = projects.Goal,
                CurrentFund = projects.CurrentFund,
                CreatorId = projects.CreatorId,
                TimesFunded = projects.TimesFunded
            }));

            return projectOption;
        }

        public List<ProjectOptions> GetMostPopularProjects()
        {
            var projects = dbContext.Set<Project>().OrderByDescending(p => p.TimesFunded).Take(5).ToList();
            var projectOptions = new List<ProjectOptions>();
            projects.ForEach(project => projectOptions.Add(new ProjectOptions()
            {
                Id = project.Id,
                CreatorId = project.CreatorId,
                CurrentFund = project.CurrentFund,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Goal = project.Goal,
                Title = project.Title,
                Status = project.Status,
                TimesFunded = project.TimesFunded
            }));
            return projectOptions;
        }

        public ProjectOptions GetProjectById(int projectId)
        {
            var project = dbContext.Set<Project>().Find(projectId);
            return new ProjectOptions()
            {
                Id = project.Id,
                CreatorId = project.CreatorId,
                CurrentFund = project.CurrentFund,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Goal = project.Goal,
                Title = project.Title,
                Status = project.Status,
                TimesFunded = project.TimesFunded
            };
        }

        public List<ProjectOptions> GetProjectsByBackerId(int backerId)
        {
            var fundings = dbContext.Set<Funding>().Where(f => f.UserId == backerId).ToList();
            var packageList = new List<Package>();
            fundings.ForEach(funding => packageList.Add(dbContext.Set<Package>().Find(funding.PackageId)));
            var projectList = new List<Project>();
            packageList.ForEach(package => projectList.Add(dbContext.Set<Project>().Find(package.ProjectId)));
            var projectOptions = new List<ProjectOptions>();
            projectList.ForEach(project => projectOptions.Add(new ProjectOptions
            {
                Id = project.Id,
                CreatorId = project.CreatorId,
                CurrentFund = project.CurrentFund,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Goal = project.Goal,
                Title = project.Title,
                Status = project.Status,
                TimesFunded = project.TimesFunded
            }));
            return projectOptions;
        }

        public List<ProjectOptions> GetProjectsByCategory(string category)
        {
            List<Project> projects = dbContext.Set<Project>().Where(c => c.Category == category).ToList();
            List<ProjectOptions> projectOption = new List<ProjectOptions>();

            projects.ForEach(projects => projectOption.Add(new ProjectOptions
            {
                Id = projects.Id,
                Title = projects.Title,
                Description = projects.Description,
                Category = projects.Category,
                Photo = projects.Photo,
                Video = projects.Video,
                Status = projects.Status,
                Goal = projects.Goal,
                CurrentFund = projects.CurrentFund,
                CreatorId = projects.CreatorId,
                TimesFunded = projects.TimesFunded
            }));

            return projectOption;
        }

        public List<ProjectOptions> GetProjectsByCreatorId(int creatorId)
        {
            List<Project> projects = dbContext.Set<Project>().Where(c => c.CreatorId == creatorId).ToList();
            List<ProjectOptions> projectOption = new List<ProjectOptions>();

            projects.ForEach(projects => projectOption.Add(new ProjectOptions
            {
                Id = projects.Id,
                Title = projects.Title,
                Description = projects.Description,
                Category = projects.Category,
                Photo = projects.Photo,
                Video = projects.Video,
                Status = projects.Status,
                Goal = projects.Goal,
                CurrentFund = projects.CurrentFund,
                CreatorId = projects.CreatorId,
                TimesFunded = projects.TimesFunded
            }));

            return projectOption;
        }

        public List<ProjectOptions> GetProjectsBySearchTerm(string searchTerm)
        {
            var projects = dbContext.Set<Project>().Where(p => p.Description.Contains(searchTerm)).ToList();
            var projectOptions = new List<ProjectOptions>();
            projects.ForEach(project => projectOptions.Add(new ProjectOptions()
            {
                Id = project.Id,
                CreatorId = project.CreatorId,
                CurrentFund = project.CurrentFund,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Goal = project.Goal,
                Title = project.Title,
                Status = project.Status,
                TimesFunded = project.TimesFunded
            }));
            return projectOptions;
        }

        public ProjectOptions UpdateProject(ProjectOptions projectOptions, int id)
        {
            var project = dbContext.Set<Project>().Find(id);
            project.Description = projectOptions.Description;
            project.Category = projectOptions.Category;
            project.Photo = projectOptions.Photo;
            project.Video = projectOptions.Video;
            project.Goal = projectOptions.Goal;
            project.Title = projectOptions.Title;
            project.Status = projectOptions.Status;
            dbContext.Update(project);
            dbContext.SaveChanges();

            return new ProjectOptions()
            {
                Id = project.Id,
                CreatorId = project.CreatorId,
                CurrentFund = project.CurrentFund,
                Description = project.Description,
                Category = project.Category,
                Photo = project.Photo,
                Video = project.Video,
                Goal = project.Goal,
                Title = project.Title,
                Status = project.Status,
                TimesFunded = project.TimesFunded
            };
        }
    }
}

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
            throw new NotImplementedException();
        }

        public bool DeleteProjectWithId(int id)
        {
            throw new NotImplementedException();
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

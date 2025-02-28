﻿using Crowdfund.Core.Options;
using System.Collections.Generic;

namespace Crowdfund.Core.Services
{
    public interface IProjectService
    {
        ProjectOptions CreateProject(ProjectOptions projectOptions);
        ProjectOptions GetProjectById(int projectId);
        List<ProjectOptions> GetProjectsByCreatorId(int creatorId);
        List<ProjectOptions> GetProjectsByBackerId(int backerId);
        List<ProjectOptions> GetProjectsByCategory(string category);
        List<ProjectOptions> GetProjectsBySearchTerm(string searchTerm);
        List<ProjectOptions> GetMostPopularProjects();
        List<ProjectOptions> GetAllProjects();
        ProjectOptions UpdateProject(ProjectOptions projectOptions, int id);
        bool DeleteProjectWithId(int id);
    }
}

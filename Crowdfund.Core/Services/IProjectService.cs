using CrowdfundCORE.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace CrowdfundCORE.Services
{
    interface IProjectService
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

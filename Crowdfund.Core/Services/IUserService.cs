using CrowdfundCORE.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace CrowdfundCORE.Services
{
    public interface IUserService
    {
        UserOptions CreateUser(UserOptions userOptions);
        UserOptions GetUserById(int id);
        List<UserOptions> GetAllUsers();
        List<UserOptions> GetBackersByProjectId(int projectId);
        UserOptions UpdateUserWithId(UserOptions userOptions, int id);
        bool DeleteUserWithId(int id);
    }
}

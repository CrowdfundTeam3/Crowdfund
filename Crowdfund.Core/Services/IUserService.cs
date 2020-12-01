using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using System.Collections.Generic;

namespace Crowdfund.Core.Services
{
    public interface IUserService
    {
        UserOptions CreateUser(UserOptions userOptions);
        UserOptions GetUserById(int id);
        List<UserOptions> GetAllUsers();
        List<UserOptions> GetBackersByProjectId(int projectId);
        UserOptions UpdateUserWithId(UserOptions userOptions, int id);
        Funding BuyPackageByUserId(int userId, int packageId);
        bool DeleteUserWithId(int id);
        UserOptions GetUserByEmail(string userEmail, string userPassword);
    }
}

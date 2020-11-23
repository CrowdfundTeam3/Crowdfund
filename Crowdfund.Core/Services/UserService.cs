using Crowdfund.Core.Data;
using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Crowdfund.Core.Services
{
    public class UserService : IUserService
    {
        private readonly CrowdfundDbContext dbContext;
        public UserService(CrowdfundDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Funding BuyPackageByUserId(int userId, int packageId)
        {
            throw new System.NotImplementedException();
        }

        public UserOptions CreateUser(UserOptions userOptions)
        {
            throw new System.NotImplementedException();
        }

        public bool DeleteUserWithId(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<UserOptions> GetAllUsers()
        {
            throw new System.NotImplementedException();
        }

        public List<UserOptions> GetBackersByProjectId(int projectId)
        {
            throw new System.NotImplementedException();
        }

        public UserOptions GetUserById(int id)
        {
            throw new System.NotImplementedException();
        }

        public UserOptions UpdateUserWithId(UserOptions userOptions, int id)
        {
            throw new System.NotImplementedException();
        }
    }
}

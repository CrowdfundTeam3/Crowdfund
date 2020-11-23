using Crowdfund.Core.Data;
using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using System.Collections.Generic;

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
            var user = new User
            {
                FirstName = userOptions.FirstName,
                LastName = userOptions.LastName,
                Email = userOptions.Email,
                Password = userOptions.Password
            };

            dbContext.Set<User>().Add(user);
            dbContext.SaveChanges();

            return new UserOptions
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.LastName,
                Password = user.Password
            };
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
            User user = dbContext.Set<User>().Find(id);
            return new UserOptions
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password
            };
        }

        public UserOptions UpdateUserWithId(UserOptions userOptions, int id)
        {
            User user = dbContext.Set<User>().Find(id);
            userOptToUser(userOptions, user);
            dbContext.SaveChanges();

            return new UserOptions
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
        }

        private static void userOptToUser(UserOptions userOptions, User user)
        {
            user.FirstName = userOptions.FirstName;
            user.LastName = userOptions.LastName;
            user.Email = userOptions.Email;
            user.Password = userOptions.Password;
        }
    }
}

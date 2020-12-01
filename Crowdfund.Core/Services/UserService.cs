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
            var user = dbContext.Set<User>().Where(u => u.Id == userId).Include(f => f.Fundings).SingleOrDefault();
            var fundingExists = dbContext.Set<Funding>().Where(u => u.UserId == userId).Where(p => p.PackageId == packageId).SingleOrDefault();

            if (fundingExists == null)
            {
                var newFund = new Funding() { PackageId = packageId, UserId = userId };
                var package = dbContext.Set<Package>().Where(p => p.Id == packageId).Include(p => p.Project).SingleOrDefault();
                var project = dbContext.Set<Project>().Find(package.ProjectId);
                project.CurrentFund += package.Price;
                project.TimesFunded += 1;
                user.Fundings.Add(newFund);
                dbContext.Update(user);
                dbContext.Update(project);
                dbContext.SaveChanges();
                return newFund;
            }
            else
            {                
                return null;
            }
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
            User user = dbContext.Set<User>().Find(id);
            if (user == null) return false;
            dbContext.Remove(user);
            dbContext.SaveChanges();
            return true;
        }

        public List<UserOptions> GetAllUsers()
        {
            List<User> users = dbContext.Set<User>().ToList();
            List<UserOptions> userOptions = new List<UserOptions>();

            users.ForEach(users => userOptions.Add(new UserOptions
            {
                FirstName = users.FirstName,
                LastName = users.LastName,
                Email = users.Email,
                Password = users.Password
            }));
            return userOptions;
        }

        public List<UserOptions> GetBackersByProjectId(int projectId)
        {
            var project = dbContext.Set<Project>().Where(p => p.Id == projectId).Include(pac => pac.Packages).SingleOrDefault();
            var fundings = new List<Funding>();
            project.Packages.ForEach(package => fundings.AddRange(dbContext.Set<Funding>().Where(f => f.PackageId == package.Id).ToList()));
            var backers = new List<User>();
            fundings.ForEach(funding => backers.Add(dbContext.Set<User>().Find(funding.UserId)));
            var userOptionsList = new List<UserOptions>();

            backers.ForEach(backer => userOptionsList.Add(new UserOptions()
            {
                Id = backer.Id,
                Email = backer.Email,
                FirstName = backer.FirstName,
                LastName = backer.LastName
            }));
            return userOptionsList;
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

        public UserOptions GetUserByEmail(string userEmail, string userPassword)
        {
            if (string.IsNullOrWhiteSpace(userEmail) ||
              string.IsNullOrWhiteSpace(userPassword))
            {
                return new UserOptions()
                {
                    ErrorMessage = "Invalid Email or Password"
                };
            }

            var user = dbContext.Set<User>().Where(u => u.Email == userEmail && u.Password == userPassword).FirstOrDefault();

            if ((user == null))
            {
                return new UserOptions()
                {
                    ErrorMessage = "User not found"
                };
            }
            else
            {
                return new UserOptions
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                };

            }
        }
    }
}

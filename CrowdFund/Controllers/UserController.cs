using Crowdfund.Core.Models;
using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using CrowdFund.Models;

namespace CrowdFund.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPut("{id}")]
        public UserOptions UpdateUserWithId(UserOptions UserOption, int id)
        {
            return userService.UpdateUserWithId(UserOption, id);
        }

        [HttpPost]
        public UserOptions CreateUser(UserOptions UserOptions)
        {
            return userService.CreateUser(UserOptions);
        }

        [HttpGet("{id}")]
        public UserOptions GetUserById(int id)
        {
            return userService.GetUserById(id);
        }

        [HttpGet("getall")]
        public List<UserOptions> GetAllUsers()
        {
            return userService.GetAllUsers();
        }

        [HttpDelete("{id}")]
        public bool DeleteUser(int id)
        {
            return userService.DeleteUserWithId(id);
        }

        [HttpPost("{userId}/package/{packageId}")]
        public Funding BuyPackageByUserId(int userId, int packageId)
        {
            return userService.BuyPackageByUserId(userId, packageId);
        }


        [HttpGet("project/{projectId}")]
        public List<UserOptions> GetBackersByProjectId(int projectId)
        {
            return userService.GetBackersByProjectId(projectId);
        }

        [HttpPost("{login}")]
        public UserOptions GetUserByEmail([FromBody] LoginOptions loginOptions)
        {
            return userService.GetUserByEmail(loginOptions.Email, loginOptions.Password);
        }
    }
}

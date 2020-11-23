using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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

    }
}

using Crowdfund.Core.Options;
using Crowdfund.Core.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}

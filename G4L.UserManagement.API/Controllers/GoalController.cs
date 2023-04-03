using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GoalController : ControllerBase
    {
        private readonly IGoalService _goalService;
        private readonly IUserService _userService;

        public GoalController(IGoalService goalService, IUserService userService)
        {
            _goalService = goalService;
            _userService = userService;
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Learner, Role.Trainer)]
        [HttpGet]
        [Route("{UserId}")]
        public async Task<IActionResult> GetAllUserGoals([FromRoute] Guid UserId)
        {
            return Ok(await _goalService.GetUserGoalsAsync(UserId));
        }

        [Authorize(Role.Super_Admin, Role.Admin,Role.Trainer)]
        [HttpGet]
        public async Task<IActionResult> GetAllGoals()
        {
            return Ok(await _goalService.GetAllGoalsAsync());
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Learner, Role.Trainer)]
        [HttpGet]
        [Route("goalId")]
        public async Task<IActionResult> GetGoal([FromRoute] Guid goalId)
        {
            return Ok(await _goalService.GetAllGoalsAsync());
        }
  
        [HttpPost]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> AddGoalsync([FromBody] GoalRequest goalRequest)
        {
            return Ok(await _goalService.CreateUserGoalAsync(goalRequest));
        }

        [HttpPut]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> UpdateGoal([FromBody] GoalRequest goal)
        {
            return Ok(await _goalService.UpdateGoal(goal));
        }
    }
}

using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        
        private readonly IFileUploadService _uploadService;
        private readonly ILogger<LeaveController> _logger;
        private readonly ILeaveService _leaveService;

        public LeaveController(ILogger<LeaveController> logger, ILeaveService leaveService, IFileUploadService uploadService)
        {
            _logger = logger;
            _leaveService = leaveService;
            _uploadService = uploadService; 
        }

        [Authorize(Role.Learner)]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] LeaveRequest leaveRequest)
        {
            _logger.Log(LogLevel.Information, $"applying for leave {leaveRequest.LeaveType}");
            await _leaveService.RequestLeaveAsync(leaveRequest);
            return Ok(leaveRequest);
        }


        [HttpPost("PostSingleFile")]
        public async Task<ActionResult> PostSingleFile([FromForm] UploadDocuments fileDetails)
        {
            if (fileDetails == null)
            {
                return BadRequest();
            }

            try
            {
                await _uploadService.PostFileAsync(fileDetails.FileDetails, fileDetails.FileType);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("balances")]
        public async Task<IActionResult> GetAsync()
        {
            var balances = await _leaveService.GetLeaveBalancesAsync();
            return Ok();
        }

        [Authorize(Role.Learner)]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeaveRequestsAsync(userId);
            return Ok(leaveRequests);
        }

        [Authorize(Role.Learner)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync([FromBody] LeaveRequest leaveRequest, Guid id)
        {
            await _leaveService.UpdateLeaveStatusAsync(id, leaveRequest.Status);
            return Ok();
        }
    }
}

using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Infrustructure.Services;
using Google.Apis.Auth.AspNetCore3;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [AllowAnonymous]
        [HttpPost("PostSingleFile")]
        public async Task<ActionResult> PostSingleFile([FromForm] DocumentRequest fileDetails)
        {
            if (fileDetails == null)
            {
                return BadRequest();
            }

            try
            {
                await _uploadService.PostFileAsync(fileDetails.FileData, fileDetails.FileType, fileDetails.LeaveType);
                return Ok(fileDetails);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [AllowAnonymous]
        [HttpGet("DownloadFile")]
        public async Task<ActionResult> DownloadFile(Guid id)
        {
          

            try
            {
                var file = await _uploadService.DownloadFileById(id);
                return Ok(file);
            }
            catch (Exception)
            {
                throw;
            }
        }




        [GoogleScopedAuthorize(DriveService.ScopeConstants.DriveReadonly)]
        [HttpGet("attachments")]
        public async Task<IActionResult> DriveFileList([FromServices] IGoogleAuthProvider auth)
        {
            GoogleCredential cred = await auth.GetCredentialAsync();
            var service = new DriveService(new BaseClientService.Initializer
            {
                HttpClientInitializer = cred
            });
            var files = await service.Files.List().ExecuteAsync();
            var fileNames = files.Files.Select(x => x.Name).ToList();
            return Ok(fileNames);
        }
     
        
        [HttpGet("balances/{userId}")]
        public async Task<IActionResult> GetLeaveBalanceAsync(Guid userId)
        {
            var balances = await _leaveService.GetLeaveBalancesAsync(userId);
            return Ok(balances);
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
        [Authorize(Role.Super_Admin,Role.Admin,Role.Trainer)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _leaveService.GetAllLeaveRequestsAsync());
        }
    }
}

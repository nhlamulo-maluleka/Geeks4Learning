using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.Web.CodeGeneration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly ILogger<LeaveController> _logger;
        
        private readonly IFileUploadService _uploadService;


        public LeaveController(ILogger<LeaveController> logger,IFileUploadService uploadService)
        {
            _logger = logger;
            
            _uploadService = uploadService;
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

    }
}


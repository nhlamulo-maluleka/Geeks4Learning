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
    public class SponsorController : ControllerBase
    {
        private readonly ILogger<SponsorController> _logger;
        private readonly ISponsorService _sponsorService;

        public SponsorController(ILogger<SponsorController> logger, ISponsorService sponsorService)
        {
            _logger = logger;
            _sponsorService = sponsorService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _sponsorService.GetAllSponsorsAsync());
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RegisterSponsorRequest sponsor)
        {
            await _sponsorService.RegisterSponsorAsync(sponsor);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] UpdateSponsorRequest sponsor)
        {
            await _sponsorService.UpdateSponsorAsync(sponsor);
            return Ok();
        }
        
        [AllowAnonymous]
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await _sponsorService.DeleteSponsorAsync(id);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var sponsor = await _sponsorService.GetSponsorByIdAsync(id);
            if (sponsor == null)
                return BadRequest("Sponsor not found");
            return Ok(sponsor);
        }
    }
}

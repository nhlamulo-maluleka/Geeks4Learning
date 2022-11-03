using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ISponsorService
    {
        Task RegisterSponsorAsync(RegisterSponsorRequest sponsor);
        Task<IEnumerable<Sponsor>> GetAllSponsorsAsync();
        Task<Sponsor> GetSponsorByIdAsync(Guid id);
        Task UpdateSponsorAsync(UpdateSponsorRequest sponsor);
        Task DeleteSponsorAsync(Guid id);   
    }
}

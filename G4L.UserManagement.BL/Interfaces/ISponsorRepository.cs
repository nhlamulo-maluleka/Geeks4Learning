﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ISponsorRepository : IRepository<Sponsor>
    {
        Task<Sponsor> GetSponsorByNameAsync(string name);
        Task CreateSponsorAsync(RegisterSponsorRequest model);
    }
    
}

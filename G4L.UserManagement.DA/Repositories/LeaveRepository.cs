using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class LeaveRepository : Repository<Leave>, ILeaveRepository
    {
        public LeaveRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}

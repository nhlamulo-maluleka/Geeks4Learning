using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA.Repositories
{
    public class AttendanceRepository : Repository<Attendance>, IAttendanceRepository
    {
        private readonly DatabaseContext _databaseContext;
        public AttendanceRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext= databaseContext;

        }

     
    }
}


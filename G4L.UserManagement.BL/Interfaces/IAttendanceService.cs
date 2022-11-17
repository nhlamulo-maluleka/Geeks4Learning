using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IAttendanceService
    {
        Task RegisterAttendanceAsync(Attendance_Register attendance_Register);
        Task<IEnumerable<Attendance>> GetAllAttendanceAsync();
        Task<Attendance> GetAttendanceByIdAsync(Guid id);
        Task UpdateAttendanceAsync(UpdateAttendance attendance_Register);
    }
}

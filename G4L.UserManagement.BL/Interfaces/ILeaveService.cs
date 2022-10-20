using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ILeaveService
    {
        Task RequestLeaveAsync(LeaveRequest leaveRequest);
        Task<List<LeaveBalanceResponse>> GetLeaveBalancesAsync(Guid userId);
        Task<List<LeaveRequest>> GetLeaveRequestsAsync(Guid userId);
        Task UpdateLeaveStatusAsync(Guid id, Enum.Status status);
        Task<IEnumerable<Leave>> GetAllLeaveRequestsAsync();
    }
}

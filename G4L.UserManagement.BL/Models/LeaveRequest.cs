using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class LeaveRequest
    {
        public Guid UserId { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public String Comments { get; set; }
        public ICollection<ApproverRequest> Approvers { get; set; }
        public ICollection<DocumentRequest> Documents { get; set; }  // TODO: think of a better way to save attachments
    }
}

using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Leave: BaseEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Status Status { get; set; }
        public string Comments { get; set; }
        public ICollection<Approver> Approvers { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}

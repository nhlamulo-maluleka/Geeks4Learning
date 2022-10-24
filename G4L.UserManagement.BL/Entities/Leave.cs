using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Leave: BaseEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal UsedDays { get; set; }
        public List<LeaveSchedule> LeaveSchedule { get; set; }
        public String Comments { get; set; }
        public Status Status { get; set; } = Status.Pending;
        public ICollection<Approver> Approvers { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}

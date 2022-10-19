using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class LeaveBalanceResponse
    {
        public LeaveType BalanceType { get; set; }
        public decimal MaxAllowed { get; set; }
        public decimal AccumalatedLeaveDays { get; set; }
        public decimal NegativeAllowedDays { get; set; }
        public decimal Remaining { get; set; }
        public decimal Used { get; set; }
    }

}

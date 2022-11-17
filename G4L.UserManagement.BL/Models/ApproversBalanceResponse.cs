using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class ApproversBalanceResponse
    {
        public Status Status { get; set; }
        public int Total { get; set; }
    }
}

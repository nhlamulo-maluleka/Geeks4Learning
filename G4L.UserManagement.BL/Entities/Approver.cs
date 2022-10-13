using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Approver: BaseEntity
    {
        public Guid UserId { get; set; }
        public Status status { get; set; }
        public String Comments { get; set; }

    }
}

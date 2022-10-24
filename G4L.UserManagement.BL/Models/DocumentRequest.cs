using G4L.UserManagement.BL.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class DocumentRequest
    {

        public Guid LeaveId { get; set; }
        public IFormFile FileData { get; set; }
        public FileType FileType { get; set; }
        public LeaveType LeaveType { get; set; }
    }
}

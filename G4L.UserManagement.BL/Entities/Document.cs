using System;
using G4L.UserManagement.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Enum;

namespace G4L.UserManagement.BL.Entities
{
    public class Document : BaseEntity
    {
        public Guid LeaveId { get; set; }
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
        public FileType FileType { get; set; }
        public LeaveType LeaveType{ get; set; }
    }
}

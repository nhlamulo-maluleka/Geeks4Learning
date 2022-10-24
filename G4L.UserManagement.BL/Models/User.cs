using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class Users
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int Surname { get; set; }
        public int Phone { get; set; }
        public int Email { get; set; }
        public int Client { get; set; }
        public int Role { get; set; }
        public int Career { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.UsersViewModel
{
    public class UsersViewModel
    {
        public UsersViewModel()
        {

        }
        public UsersViewModel(Users users)
        {
            Id = users.Id;
            Name = users.Name;
            Surname = users.Surname;
            Phone = users.Phone;
            Email = users.Email;
            Client = users.Client;
            Role = users.Role;
            Career = users.Career;

        }
        public int Id { get; set; }
        public int Name { get; set; }
        public int Surname { get; set; }
        public int Phone { get; set; }
        public int Email { get; set; }
        public int Client { get; set; }
        public int Role { get; set; }
        public int Career { get; set; }
        public List<UsersViewModel> UsersList { get; set; }
        public int TotalCount { get; set; }
    }
}

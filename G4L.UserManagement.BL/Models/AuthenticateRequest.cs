using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace G4L.UserManagement.BL.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
      
    }
}

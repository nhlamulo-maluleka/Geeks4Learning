using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace G4L.UserManagement.BL.Models
{
    public class RegisterRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        public string Client { get; set; }
        public Career? Career { get; set; }
        public Role? Role { get; set; }
        public DateTime LearnershipStartDate { get; set; }
        [Required]
        public string Password { get; set; }
       
    }
}

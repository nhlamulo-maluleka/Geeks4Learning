using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace G4L.UserManagement.BL.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Client { get; set; }
        public Career Career { get; set; }
        public Role Role { get; set; }
        public DateTime LearnershipStartDate { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public List<Leave> Leaves { get; set; }
    }
}

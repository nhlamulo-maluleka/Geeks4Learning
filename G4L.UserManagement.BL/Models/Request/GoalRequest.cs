using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class GoalRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public int PausedCount { get; set; }
        public int ArchiveCount { get; set; }
        public Guid UserId { get; set; }
        public List<GoalComment> Comment { get; set; }
        public string TimeRemaining { get; set; }
        public List<GoalTask> Tasks { get; set; }
    }
}

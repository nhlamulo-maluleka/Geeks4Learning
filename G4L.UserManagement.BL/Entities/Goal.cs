using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Goal: BaseEntity
    {
        public Goal() {
            Comment = new List<GoalComment>();
            Tasks = new List<GoalTask>();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public int PausedCount { get; set; }
        public int ArchiveCount { get; set; }
        public Guid UserId { get; set; }
        public List<GoalComment> Comment { get; set; }
        public TimeSpan TimeRemaining { get; set; }
        public List<GoalTask> Tasks { get; set; }
       
    }
}

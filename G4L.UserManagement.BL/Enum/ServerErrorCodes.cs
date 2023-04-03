using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Enum
{
    public enum ServerErrorCodes
    {
        InCorrectEmail,
        UserNotFound,
        DuplicateIdNumber,
        DuplicateEmail,
        DuplicatePhoneNumber,
        DuplicateAttendanceDate,
        DuplicateGoal,
        GoalNotFound
    }
}

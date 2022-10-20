using G4L.UserManagement.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class PaginatedList<User> : List<User>
    {
        public int PageIndex { get; private set; }
        public int TotalPages { get; set; }

        public PaginatedList(List<User> items,int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.
        }
    }
}

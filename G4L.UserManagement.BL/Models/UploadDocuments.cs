using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace G4L.UserManagement.BL.Models
{
    public class UploadDocuments
    {
        public IFormFile FileDetails { get; set; }
        public FileType FileType { get; set; }
    }
}

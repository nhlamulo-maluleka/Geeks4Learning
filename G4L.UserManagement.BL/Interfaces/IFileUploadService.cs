using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Entities;


namespace G4L.UserManagement.BL.Interfaces
{
    public interface IFileUploadService
    {
        public Task PostFileAsync(IFormFile fileData, FileType fileType);

        public Task<List<DocumentRequest>> GetDocumentsAsync(Guid Id);

    }
}

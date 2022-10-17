using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly DatabaseContext _databaseContext;



        public FileUploadService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;

        }
        public async Task PostFileAsync(IFormFile fileData, FileType fileType)
        {
            {
                try
                {
                    var fileDetails = new Document()
                    {


                        FileName = fileData.FileName,
                        FileType = fileType,
                    };

                    using (var stream = new MemoryStream())
                    {
                        fileData.CopyTo(stream);
                        fileDetails.FileData = stream.ToArray();
                    }


                    var result = _databaseContext.Add(fileDetails);
                    await _databaseContext.SaveChangesAsync();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public async Task PostMultiFileAsync(List<UploadDocuments> fileData)
        {
            try
            {
                foreach (UploadDocuments file in fileData)
                {
                    var fileDetails = new Document()
                    {

                        FileName = file.FileDetails.FileName,
                        FileType = file.FileType,
                    };

                    using (var stream = new MemoryStream())
                    {
                        file.FileDetails.CopyTo(stream);
                        fileDetails.FileData = stream.ToArray();
                    }

                    var result = _databaseContext.Add(fileDetails);
                }
                await _databaseContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        Task IFileUploadService.DownloadFileById(int fileName)
        {
            throw new NotImplementedException();
        }
    }
}

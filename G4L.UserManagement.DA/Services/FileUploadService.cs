using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic.FileIO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly ILeaveRepository _leaveRepository;
      
        private readonly IFileRepository _fileRepository;
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public FileUploadService(DatabaseContext databaseContext, IMapper mapper, ILeaveRepository leaveRepository)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _leaveRepository = leaveRepository;
    

        }
        public async Task PostFileAsync(IFormFile fileData, FileType fileType, LeaveType leaveType)
        {

     
            

            try
                {
              
                    var fileDetails = new Document()
                    {
                      

                        FileName = fileData.FileName,
                        FileType = fileType,
                        LeaveType = leaveType,
                        
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

        public async Task DownloadFileById(Guid Id)
        {
            try
            {
                var file = _databaseContext.Documents.Where(x => x.Id == Id).FirstOrDefaultAsync();

                var content = new System.IO.MemoryStream(file.Result.FileData);
                var path = Path.Combine(
                   Directory.GetCurrentDirectory(), "FileDownloaded",
                   file.Result.FileName);

                await CopyStream(content, path);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task CopyStream(Stream stream, string downloadPath)
        {
            using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write))
            {
                await stream.CopyToAsync(fileStream);
            }
        }


    }
    }


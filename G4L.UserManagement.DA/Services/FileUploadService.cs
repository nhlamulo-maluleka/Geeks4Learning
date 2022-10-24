using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;

        public FileUploadService(IMapper mapper, ILeaveRepository leaveRepository, IFileRepository fileRepository)
        {
            _mapper = mapper;
            _leaveRepository = leaveRepository;
            _fileRepository = fileRepository;
        }

        public async Task PostFileAsync(DocumentRequest documentRequest)
        {
            try
            {
                var fileDetails = new Document()
                {
                    FileName = documentRequest.LeaveType.ToString(),
                    FileType = documentRequest.FileType,
                    LeaveType = documentRequest.LeaveType,
                    FileData = new byte[100]
                };

                //using (var stream = new MemoryStream())
                //{
                //    fileData.CopyTo(stream);
                //    fileDetails.FileData = stream.ToArray();
                //}

                await _fileRepository.CreateAsync(fileDetails);

                //var result = _databaseContext.Add(fileDetails);
                //await _databaseContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

        }

        public async Task<string> DownloadFileById(Guid Id)
        {
            try
            {
                var file = await _fileRepository.GetByIdAsync(Id);
                //var file = await _databaseContext.Documents.Where(x => x.Id == Id).FirstOrDefaultAsync();

                return Convert.ToBase64String(file.FileData);
                //var content = new System.IO.MemoryStream(file.Result.FileData);
                //var path = Path.Combine(
                //   Directory.GetCurrentDirectory(), "FileDownloaded",
                //   file.Result.FileName);

                //await CopyStream(content, path);
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

        public async Task<IEnumerable<Document>> GetAllLeaveDocumentsAsync(Guid LeaveId)
        {
            return await _fileRepository.ListAsync(x => x.LeaveId == LeaveId);
        }
    }
}


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
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public FileUploadService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;


        }
        public async Task PostFileAsync(IFormFile fileData, FileType fileType)
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

        Task<List<DocumentRequest>> IFileUploadService.GetDocumentsAsync(Guid Id)
        {
            throw new NotImplementedException();
        }
    }
    }


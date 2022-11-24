using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class SponsorRepository : Repository<Sponsor>, ISponsorRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        public SponsorRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task CreateSponsorAsync(RegisterSponsorRequest model)
        {
            // validate
            if (_databaseContext.Sponsors.Any(x => x.Name == model.Name))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "Sponsor with this name already exist"
                }));

            // map model to new user object
            var sponsor = _mapper.Map<Sponsor>(model);

            await _databaseContext.Sponsors.AddAsync(sponsor);
            await _databaseContext.SaveChangesAsync();
        }

        public async Task<Sponsor> GetSponsorByNameAsync(string name)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<Sponsor>().Where(x => x.Name == name).FirstOrDefaultAsync();
            });
        }
    }
}

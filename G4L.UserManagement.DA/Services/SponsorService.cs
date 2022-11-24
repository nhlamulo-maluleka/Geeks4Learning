using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class SponsorService : ISponsorService
    {
        private readonly ISponsorRepository _sponsorRepository;
        private readonly IMapper _mapper;

        public SponsorService(ISponsorRepository sponsorRepository, IMapper mapper)
        {
            _sponsorRepository = sponsorRepository;
            _mapper = mapper;
        }

        public async Task RegisterSponsorAsync(RegisterSponsorRequest model)
        {
            await _sponsorRepository.CreateSponsorAsync(model);
        }

        public async Task<IEnumerable<Sponsor>> GetAllSponsorsAsync()
        {
            return await _sponsorRepository.ListAsync();
        }

        public async Task DeleteSponsorAsync(Guid id)
        {
            await _sponsorRepository.DeleteAsync(id);
        }

        public async Task<Sponsor> GetSponsorAsync(string name) 
        {
            return await _sponsorRepository.GetSponsorByNameAsync(name);
        }

        public async Task<Sponsor> GetSponsorByIdAsync(Guid id)
        {
            return await _sponsorRepository.GetByIdAsync(id);
        }

        public async Task UpdateSponsorAsync(UpdateSponsorRequest model)
        {
            var sponsor = await _sponsorRepository.GetByIdAsync(model.Id);

            //validate
            if (sponsor == null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.SponsorNotFound.ToString(),
                    Message = "Sponsor not found"
                }));

            if (await _sponsorRepository.QueryAsync(x => x.Name == model.Name && x.Id != model.Id) != null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.SponsorAlreadyExists.ToString(),
                    Message = "Sponsor already exists"
                }));

            //update sponsor properties
            sponsor.Name = model.Name;
            sponsor.Description = model.Description;
            sponsor.Image = model.Image;

            await _sponsorRepository.UpdateAsync(sponsor);
        }
        
        
    }
}

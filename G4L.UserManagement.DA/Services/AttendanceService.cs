using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AttendanceService(IAttendanceRepository attendanceRepository, IUserRepository userRepository,IMapper mapper)
        {
            _attendanceRepository = attendanceRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task RegisterAttendanceAsync(Attendance_Register attendance_Register)
        {
            var attendance = _mapper.Map<Attendance>(attendance_Register);
            await _attendanceRepository.CreateAsync(attendance);
        }

        public async Task<IEnumerable<Attendance>> GetAllAttendanceAsync()
        {
            return await _attendanceRepository.ListAsync();
        }

        public async Task UpdateAttendanceAsync(UpdateAttendance model)
        {
            var learner = await _attendanceRepository.GetByIdAsync(model.Id);



            // Update the following for Attaendance;

         
          learner.Goal_summary = model.Goal_summary;
          learner.Goal_Description = model. Goal_Description;
          learner.Time_Limit = model.Time_Limit;
         

            await _attendanceRepository.UpdateAsync(learner);
        }

        public async Task<Attendance>GetAttendanceByIdAsync(Guid id)
        {
            return await _attendanceRepository.GetByIdAsync(id);
        }
       
    }
    }

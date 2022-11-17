using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;

namespace G4L.UserManagement.API.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticateResponse>().ReverseMap();
            CreateMap<RegisterRequest, User>().ReverseMap();
            CreateMap<LeaveRequest, Leave>().ReverseMap();
            CreateMap<ApproverRequest, Approver>().ReverseMap();
            CreateMap<DocumentRequest, Document>().ReverseMap();
            CreateMap<LeaveScheduleRequest, LeaveSchedule>().ReverseMap();
            CreateMap<Sponsor, SponsorResponse>().ReverseMap();
            CreateMap<RegisterSponsorRequest, Sponsor>().ReverseMap();
            CreateMap<Attendance_Register, Attendance>().ReverseMap();
        }
    }
}

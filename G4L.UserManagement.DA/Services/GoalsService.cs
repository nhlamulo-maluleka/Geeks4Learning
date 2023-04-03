using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.DA.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class GoalsService : IGoalService
    {
        private readonly IGoalRepository _goalRepository;
        private readonly IMapper _mapper;

        public GoalsService(IGoalRepository goalRepository, IUserRepository userRepository, IMapper mapper)
        {
            _goalRepository = goalRepository;
            _mapper = mapper;
        }

        public async Task<GoalResponse> CreateUserGoalAsync(GoalRequest goalRequest)
        {
            var getGoalRequestedTitle = GetUserGoalsAsync(goalRequest.UserId).Result.Where(goal =>
            goal.Title.ToLower().Trim() == goalRequest.Title.ToLower().Trim() && goal.GoalStatus != GoalStatus.completed);

            if (getGoalRequestedTitle.ToList().Count() > 0) {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateGoal.ToString(),
                    Message = "Goal already exists from " + getGoalRequestedTitle.First().GoalStatus.ToString()
                }));
            }
            var goal = _mapper.Map<Goal>(goalRequest);
            await _goalRepository.AddAsync(goal);
            return _mapper.Map<GoalResponse>(goal);
        }

        public async Task<List<GoalResponse>> GetUserGoalsAsync(Guid UserId)
        {
            var allUserGoals = await _goalRepository.ListAsync(goal => goal.UserId == UserId);
            return _mapper.Map<List<GoalResponse>>(allUserGoals);
        }

        public async Task<GoalResponse> GetGoal(Guid goalId)
        {
            var allUserGoals = await _goalRepository.GetByIdAsync(goalId);
            return _mapper.Map<GoalResponse>(allUserGoals);
        }


        public async Task<List<GoalResponse>> GetAllGoalsAsync()
        {
            var allUserGoals = await _goalRepository.ListAsync();
            return _mapper.Map<List<GoalResponse>>(allUserGoals);
        }

        public async Task<GoalResponse> UpdateGoal(GoalRequest goalRequest)
        {
            if (GetGoal(goalRequest.Id).Result == null)
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.GoalNotFound.ToString(),
                    Message = "Goal not found"
                })) ;
            }
            var goal = _mapper.Map<Goal>(goalRequest);
            await _goalRepository.UpdateAsync(goal);
            return _mapper.Map<GoalResponse>(goal);
        }

        
    }
}

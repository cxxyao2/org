using AutoMapper;
using CsharpApi.Entities;
using CsharpApi.Helpers;
using CsharpApi.Models.Users;
using CsharpApi.Repositories;

namespace CsharpApi.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task Create(CreateRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);

    }
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }


        public async Task<User> GetById(int id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }

        public async Task Create(CreateRequest model)
        {
            // validate
            if (await _userRepository.GetByEmail(model.Email!) != null)
                throw new AppException($"Email '{model.Email}' is already registered");

            // map model to new user object
            var user = _mapper.Map<User>(model);

            // hash password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // save user
            await _userRepository.Create(user);
        }

        public async Task Update(int id, UpdateRequest model)
        {
            var user = await _userRepository.GetById(id);

            // validate
            if (user == null) throw new KeyNotFoundException("User not found");

            var emailChanged = !string.IsNullOrEmpty(model.Email) && model.Email != user.Email;

            if (emailChanged && await _userRepository.GetByEmail(model.Email!) != null)
                throw new AppException($"Email '{model.Email}' is already registered");

            // hash password if it was entered
            if (!string.IsNullOrEmpty(model.Password))
                model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, user);
            await _userRepository.Update(user);
        }

        public async Task Delete(int id)
        {
            await _userRepository.GetById(id);

        }

    }
}
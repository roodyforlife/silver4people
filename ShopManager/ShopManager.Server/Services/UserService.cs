using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Validators;
using System.Data;
using System.Threading;

namespace ShopManager.Server.Services
{
    public class UserService : IUserService
    {
        private readonly AdminRegisterValidator _validator;
        private readonly UserManager<Admin> _userManager;
        private readonly RoleManager<Admin> _roleManager;

        public UserService(AdminRegisterValidator validator, UserManager<Admin> userManager)
        {
            _validator = validator;
            _userManager = userManager;
        }

        public async Task<ValidationResult> RegisterAdmin(UserRegisterDto adminRegisterDto)
        {
            var validationResult = await _validator.ValidateAsync(adminRegisterDto);

            if (validationResult.IsValid)
            {
                var user = new Admin() { UserName = adminRegisterDto.Login };
                var result = await _userManager.CreateAsync(user, adminRegisterDto.Password);

                if(result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Roles.Admin);
                }
            }

            return validationResult;
        }

        public async Task<ValidationResult> RegisterManager(UserRegisterDto adminRegisterDto)
        {
            var validationResult = await _validator.ValidateAsync(adminRegisterDto);

            if (validationResult.IsValid)
            {
                var user = new Admin() { UserName = adminRegisterDto.Login };
                var result = await _userManager.CreateAsync(user, adminRegisterDto.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Roles.Manager);
                }
            }

            return validationResult;
        }

        public async Task DeleteAsync(string login)
        {
            var admin = await _userManager.FindByNameAsync(login);
            await _userManager.DeleteAsync(admin);
        }

        public async Task<List<AdminListResponse>> GetAllAsync()
        {
            var admins = await _userManager.Users
                .Select(x => new AdminListResponse() { Login = x.UserName }).ToListAsync();

            return admins;
        }
    }
}

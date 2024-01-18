using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Validators;
using System.Data;
using System.Threading;

namespace ShopManager.Server.Services
{
    public class AdminRegisterService : IRegisterService
    {
        private readonly AdminRegisterValidator _validator;
        private readonly UserManager<Admin> _userManager;

        public AdminRegisterService(AdminRegisterValidator validator, UserManager<Admin> userManager)
        {
            _validator = validator;
            _userManager = userManager;
        }

        public async Task<ValidationResult> RegisterAdmin(AdminRegisterDto adminRegisterDto)
        {
            var validationResult = await _validator.ValidateAsync(adminRegisterDto);

            if (validationResult.IsValid)
            {
                var user = new Admin() { UserName = adminRegisterDto.Login };
                var result = await _userManager.CreateAsync(user, adminRegisterDto.Password);
            }

            return validationResult;
        }
    }
}

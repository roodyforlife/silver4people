using FluentValidation.Results;
using ShopManager.Server.Dto;

namespace ShopManager.Server.Interfaces
{
    public interface IUserService
    {
        Task<ValidationResult> RegisterManager(UserRegisterDto adminRegisterDto);

        Task DeleteAsync(string login);

        Task<List<AdminListResponse>> GetAllAsync();

        Task UpdateAdminPassword(string login, string currentPassword, string newPassword);
    }
}

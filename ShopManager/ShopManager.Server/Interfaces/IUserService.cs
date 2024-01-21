using FluentValidation.Results;
using ShopManager.Server.Dto;

namespace ShopManager.Server.Interfaces
{
    public interface IUserService
    {
        Task<ValidationResult> RegisterManager(UserRegisterDto adminRegisterDto);

        Task<ValidationResult> RegisterAdmin(UserRegisterDto adminRegisterDto);

        Task DeleteAsync(string login);

        Task<List<AdminListResponse>> GetAllAsync();
    }
}

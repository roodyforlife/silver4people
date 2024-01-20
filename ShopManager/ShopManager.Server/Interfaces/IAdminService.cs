using FluentValidation.Results;
using ShopManager.Server.Dto;

namespace ShopManager.Server.Interfaces
{
    public interface IAdminService
    {
        Task<ValidationResult> RegisterAdmin(AdminRegisterDto adminRegisterDto);

        Task DeleteAsync(string login);

        Task<List<AdminListResponse>> GetAllAsync();
    }
}

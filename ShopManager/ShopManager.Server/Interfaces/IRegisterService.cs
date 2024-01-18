using FluentValidation.Results;
using ShopManager.Server.Dto;

namespace ShopManager.Server.Interfaces
{
    public interface IRegisterService
    {
        Task<ValidationResult> RegisterAdmin(AdminRegisterDto adminRegisterDto);
    }
}

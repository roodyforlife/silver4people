using ShopManager.Server.Dto;
using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface IProductService
    {
        Task CreateAsync(ProductCreationDto productCreation);

        Task<List<Product>> GetAllAsync();
    }
}

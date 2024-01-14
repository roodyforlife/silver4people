using ShopManager.Server.Dto;
using ShopManager.Server.Models;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Interfaces
{
    public interface IProductService
    {
        Task CreateAsync(ProductCreationDto productCreation);

        Task<List<Product>> GetAllAsync(ISpecification<Product> specification);
    }
}

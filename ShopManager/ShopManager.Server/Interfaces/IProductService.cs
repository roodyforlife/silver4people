using ShopManager.Server.Dto;
using ShopManager.Server.Models;
using ShopManager.Server.Requests;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Interfaces
{
    public interface IProductService
    {
        Task CreateAsync(ProductCreationDto productCreation);

        Task<PageResponse<Product>> GetAllAsync(IPageRequest<Product> specification);

        Task DeleteAsync(Guid id);
    }
}

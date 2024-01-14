using ShopManager.Server.Models;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product, Guid>
    {
        Task<List<Product>> GetAllAsync(ISpecification<Product> specification);
    }
}

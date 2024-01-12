using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product, Guid>
    {
    }
}

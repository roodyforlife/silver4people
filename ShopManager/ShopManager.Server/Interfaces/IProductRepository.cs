using ShopManager.Server.Models;
using ShopManager.Server.Requests;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product, Guid>
    {
        Task<PageResponse<Product>> GetAllAsync(IPageRequest<Product> request);

        Task<string> GenerateArticle();

        Task<bool> ArticleExists(string article);

        Task<int> GetProfit(IPageRequest<Product> request);
    }
}

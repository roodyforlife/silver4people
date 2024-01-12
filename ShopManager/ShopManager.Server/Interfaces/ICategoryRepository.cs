using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface ICategoryRepository : IBaseRepository<Category, int>
    {
        Task<List<Category>> GetAsync(int[] ides);
    }
}

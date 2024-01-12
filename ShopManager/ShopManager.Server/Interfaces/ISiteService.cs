using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface ISiteService
    {
        Task CreateAsync(Site site);

        Task<List<Site>> GetAllAsync();
    }
}

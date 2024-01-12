using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Services
{
    public class SiteService : ISiteService
    {
        private readonly ISiteRepository _siteRepository;

        public SiteService(ISiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }

        public async Task CreateAsync(Site site)
        {
            await _siteRepository.CreateAsync(site);
        }

        public async Task<List<Site>> GetAllAsync()
        {
            return await _siteRepository.GetAllAsync();
        }
    }
}

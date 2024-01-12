using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Repositories
{
    public class SiteRepository : BaseRepository<Site, int>, ISiteRepository
    {
        public SiteRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public override Task<List<Site>> GetAllAsync()
        {
            return _appDbContext.Sites.ToListAsync();
        }

        public override async Task<Site> GetByIdAsync(int id)
        {
            return await _appDbContext.Sites.FindAsync(id);
        }
    }
}

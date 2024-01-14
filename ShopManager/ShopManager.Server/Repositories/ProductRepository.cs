using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Repositories
{
    public class ProductRepository : BaseRepository<Product, Guid>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public override Task<List<Product>> GetAllAsync()
        {
            return _appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Images)
                .ToListAsync();
        }

        public override Task<Product> GetByIdAsync(Guid id)
        {
            return _appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Images)
                .Include(c => c.Sites)
                .FirstAsync(c => c.Id == id);
        }
    }
}

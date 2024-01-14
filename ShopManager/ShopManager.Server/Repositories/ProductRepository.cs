using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Repositories
{
    public class ProductRepository : BaseRepository<Product, Guid>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }


        public Task<List<Product>> GetAllAsync(ISpecification<Product> specification)
        {
            return specification.Specify(_appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Images))
                .ToListAsync();
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

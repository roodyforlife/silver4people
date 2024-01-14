using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Requests;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ISiteRepository _siteRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ProductService(IProductRepository repository, ICategoryRepository categoryRepository, ISiteRepository siteRepository)
        {
            _productRepository = repository;
            _categoryRepository = categoryRepository;
            _siteRepository = siteRepository;
        }

        public async Task CreateAsync(ProductCreationDto productCreation)
        {
            var categories = await _categoryRepository.GetAsync(productCreation.CategoryIdes);
            var sites = await _siteRepository.GetAsync(productCreation.SiteIdes);
            var images = productCreation.Images.Select(c => new Image()
            {
                Id = c.Id,
                Index = c.Index
            }).ToList();


            var product = new Product()
            {
                Id = productCreation.Id,
                Name = productCreation.Name,
                Description = productCreation.Description,
                Article = productCreation.Article,
                Categories = categories,
                Location = productCreation.Location,
                Published = productCreation.Published,
                PurchasePrice = productCreation.PurchasePrice,
                SalePrice = productCreation.SalePrice,
                TrackNumber = productCreation.TrackNumber,
                Sites = sites,
                Images = images,
            };

            await _productRepository.CreateAsync(product);
        }

        public async Task<PageResponse<Product>> GetAllAsync(IPageRequest<Product> specification)
        {
            return await _productRepository.GetAllAsync(specification);
        }
    }
}

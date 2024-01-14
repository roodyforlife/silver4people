using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IImageService _imageService;
        private readonly ICategoryRepository _categoryRepository;

        public ProductService(IProductRepository repository, IImageService imageService, ICategoryRepository categoryRepository)
        {
            _productRepository = repository;
            _imageService = imageService;
            _categoryRepository = categoryRepository;
        }

        public async Task CreateAsync(ProductCreationDto productCreation)
        {
            var categories = await _categoryRepository.GetAsync(productCreation.CategoryIdes);
            var images = productCreation.Images.Select(c => new Image()
            {
                Id = c.Id,
                Index = c.Index
            }).ToList();

            var imageCreationTasks = productCreation.Images
                .Select(c => _imageService.Save(c.FormFile.File, c.Id)).ToArray();

            Task.WaitAll(imageCreationTasks);


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
                SiteId = productCreation.SiteId,
                TrackNumber = productCreation.TrackNumber,
                Images = images,
            };

            await _productRepository.CreateAsync(product);
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _productRepository.GetAllAsync();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Requests;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProductsController : Controller
    {
        private readonly IProductService _productService;

        public UserProductsController(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<IActionResult> Index([FromQuery] UserProductsRequest request)
        {
            var result = (await _productService.GetAllAsync(request));

            var products = result.PageItems.Select(c => new UserProductResponse
            {
                CreationDate = c.CreationDate,
                EditionDate = c.EditionDate,
                Article = c.Article,
                Categories = c.Categories,
                Id = c.Id,
                Images = c.Images,
                Name = c.Name,
                PurchasePrice = c.PurchasePrice,
                SalePrice = c.SalePrice,
            }).ToList();

            return Ok(new PageResponse<UserProductResponse>()
            {
                ItemsCount = result.ItemsCount,
                PageItems = products
            });
        }
    }
}

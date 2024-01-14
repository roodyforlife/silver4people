using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public AdminProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] AdminProductsRequest request)
        {
            var products = await _productService.GetAllAsync(request);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ProductCreationDto productCreationDto)
        {
            await _productService.CreateAsync(productCreationDto);
            return Ok();
        }
    }
}

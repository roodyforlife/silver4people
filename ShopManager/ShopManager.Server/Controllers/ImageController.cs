using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Interfaces;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : Controller
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var imageData = await _imageService.GetAsync(id);
            return File(imageData, "image/webp");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Create(Guid id, IFormFile file)
        {
            await _imageService.SaveAsync(file, id);
            return Ok();
        }
    }
}

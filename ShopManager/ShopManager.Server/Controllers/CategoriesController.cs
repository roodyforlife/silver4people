using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Services;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _categoryService.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Category category)
        {
            await _categoryService.CreateAsync(category);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _categoryService.TryDeleteAsync(id);

            if (success)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}

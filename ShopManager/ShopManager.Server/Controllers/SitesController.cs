using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SitesController : Controller
    {
        private readonly ISiteService _siteService;

        public SitesController(ISiteService siteService)
        {
            _siteService = siteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _siteService.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Site site)
        {
            await _siteService.CreateAsync(site);
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Authorization.Interfaces;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ISignInService _signInService;
        private readonly IAdminService _adminService;

        public AuthController(ISignInService signInService, IAdminService registerService)
        {
            _signInService = signInService;
            _adminService = registerService;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(AdminSignInDto userSignInDto)
        {
            var token = await _signInService.SignIn(userSignInDto);
            return Ok(token);
        }

        [HttpPost("registerAdmin")]
        public async Task<IActionResult> Register(AdminRegisterDto userSignInDto)
        {
            var result = await _adminService.RegisterAdmin(userSignInDto);

            if (result.IsValid)
            {
                return Ok();
            }

            return BadRequest(result);
        }

        [HttpDelete("{login}")]
        public async Task<IActionResult> DeleteAdmin(string login)
        {
            await _adminService.DeleteAsync(login);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _adminService.GetAllAsync());
        }

        [Authorize]
        [HttpPost("checkToken")]
        public IActionResult CheckToken()
        {
            return Ok();
        }
    }
}

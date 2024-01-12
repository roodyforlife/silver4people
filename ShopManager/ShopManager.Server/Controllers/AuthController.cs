using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Authorization.Interfaces;
using ShopManager.Server.Dto;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ISignInService _signInService;

        public AuthController(ISignInService signInService)
        {
            _signInService = signInService;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(AdminSignInDto userSignInDto)
        {
            var token = await _signInService.SignIn(userSignInDto);
            return Ok(token);
        }

        [Authorize]
        [HttpPost("checkToken")]
        public IActionResult CheckToken()
        {
            return Ok();
        }
    }
}

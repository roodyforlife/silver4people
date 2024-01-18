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
        private readonly IRegisterService _registerService;

        public AuthController(ISignInService signInService, IRegisterService registerService)
        {
            _signInService = signInService;
            _registerService = registerService;
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
            var result = await _registerService.RegisterAdmin(userSignInDto);

            if(result.IsValid)
            {
                return Ok();
            }

            return BadRequest(result);
        }

        [Authorize]
        [HttpPost("checkToken")]
        public IActionResult CheckToken()
        {
            return Ok();
        }
    }
}

using System.Linq;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RestApi.Controllers
{
	[Route("")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet]
		public ActionResult Get()
			=> Ok("Server is running");

		[Authorize(policy: "ApiScope")]
		[HttpGet("claims")]
		public async Task<ApiResponse> GetClaims()
		{
			return new ApiResponse(from c in User.Claims select new { c.Type, c.Value });
		}
	}
}
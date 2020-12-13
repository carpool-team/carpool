using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RestApi.Extensions;

namespace RestApi.Controllers
{
	[Route("")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet]
		public ActionResult Get()
			=> Ok("Server is running");

		[Authorize("ApiScope")]
		[HttpGet("claims")]
		public async Task<ApiResponse> GetClaims()
		{
			var appUserId = User.GetUserId();

			return new(from c in User.Claims select new {c.Type, c.Value});
		}	
	}
}
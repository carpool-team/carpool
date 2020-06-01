using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet]
		public async Task<ActionResult> Get()
		{
			return Ok("Server is running");
		}
	}
}
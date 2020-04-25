using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.RestAPI.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestController : ParentController
	{
		[HttpGet("GetTest")]
		public async Task<IActionResult> GetTest()
		{
			return Json("Test test test");
		}
	}
}
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
	}
}
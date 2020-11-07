using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet]
		public ActionResult Get()
			=> Ok("Server is running TEST TEST TEST");
	}
}
using Carpool.Core.Models;
using Carpool.RestAPI.DTOs.UserDTOs;

namespace Carpool.RestAPI.DTOs.StopDTOs
{
	public class IndexStopDTO
	{
		private IndexStopDTO()
		{
		}

		public IndexUserDto User { get; set; }
		public Location Location { get; set; }
	}
}
using Carpool.Core.ValueObjects;
using Carpool.RestAPI.DTOs.User;

namespace Carpool.RestAPI.DTOs.Stop
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
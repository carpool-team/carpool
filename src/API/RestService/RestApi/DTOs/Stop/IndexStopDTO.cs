using Domain.ValueObjects;
using RestApi.DTOs.User;

namespace RestApi.DTOs.Stop
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
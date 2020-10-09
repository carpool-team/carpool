using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.StopDTOs
{
	public class IndexStopDTO
	{
		private IndexStopDTO()
		{
		}

		public IndexUserDTO User { get; set; }
		public Location Location { get; set; }

		public static IndexStopDTO GetFromStop(Stop stop)
			=> new IndexStopDTO
			{
				User = IndexUserDTO.FromUser(stop.User),
				Location = stop.Location
			};
	}
}
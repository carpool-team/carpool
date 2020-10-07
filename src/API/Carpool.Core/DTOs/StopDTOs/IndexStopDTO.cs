using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.StopDTOs
{
	public class IndexStopDTO
	{
		public IndexUserDTO User { get; set; }
		public Location Location { get; set; }

		private IndexStopDTO()
		{
		}

		public static IndexStopDTO GetFromStop(Stop stop)
		{
			return new IndexStopDTO()
			{
				User = IndexUserDTO.FromUser(stop.User),
				Location = stop.Location,
			};
		}
	}
}
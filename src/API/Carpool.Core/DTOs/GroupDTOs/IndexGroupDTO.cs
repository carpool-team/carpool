using Carpool.Core.DTOs.LocationDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class IndexGroupDTO
	{
		public LocationDTO Location { get; set; }

		public string Name { get; set; }

		public int RideCount { get; set; }

		public int UserCount { get; set; }

		public static IndexGroupDTO FromGroup(Group group)
		{
			return new IndexGroupDTO()
			{
				Location = LocationDTO.FromLocation(group.Location),
				Name = group.Name,
				RideCount = group.Rides.Count(),
				UserCount = group.UserGroups.Count()
			};
		}
	}
}
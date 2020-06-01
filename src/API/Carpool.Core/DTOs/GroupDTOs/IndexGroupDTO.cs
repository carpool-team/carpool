using Carpool.Core.DTOs.LocationDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class IndexGroupDTO
	{
		[Required]
		public LocationDTO Location { get; set; }

		[Required]
		public string Name { get; set; }

		public int RideCount { get; set; }

		public int UserCount { get; set; }

		public static IndexGroupDTO FromGroup(Group group)
		{
			return new IndexGroupDTO()
			{
				Location = group.Location != null ? LocationDTO.FromLocation(group.Location) : null,
				Name = group.Name,
				RideCount = group.Rides.Count(),
				UserCount = group.UserGroups.Count()
			};
		}
	}
}
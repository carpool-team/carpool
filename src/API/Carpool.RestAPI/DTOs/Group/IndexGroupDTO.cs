using System;
using System.Linq;
using Carpool.Core.Models;

namespace Carpool.RestAPI.DTOs.GroupDTOs
{
	public class IndexGroupDTO
	{
		public IndexGroupDTO(Guid id, Location location, string name, int rideCount, int userCount) : this(id, name, rideCount, userCount)
		{
			Location = location;
		}

		public IndexGroupDTO(Guid id, string name, int rideCount, int userCount) : this()
		{
			Id = id;
			Name = name;
			RideCount = rideCount;
			UserCount = userCount;
		}

		public IndexGroupDTO()
		{
		}

		public Guid Id { get; set; }

		public Location Location { get; set; }

		public string Name { get; set; }

		public int RideCount { get; set; }

		public int UserCount { get; set; }
	}
}
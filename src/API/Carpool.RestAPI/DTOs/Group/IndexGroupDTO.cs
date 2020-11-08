using System;
using Carpool.Core.Models;

namespace Carpool.RestAPI.DTOs.GroupDTOs
{
	public class IndexGroupDTO
	{
		public IndexGroupDTO(Guid id, Location location, string name, int rideCount) : this(id, name,
			rideCount)
			=> Location = location;

		public IndexGroupDTO(Guid id, string name, int rideCount) : this()
		{
			Id = id;
			Name = name;
			RideCount = rideCount;
		}

		public IndexGroupDTO()
		{
		}

		public Guid Id { get; set; }

		public Location Location { get; set; }

		public string Name { get; set; }

		public int RideCount { get; set; }
    }
}
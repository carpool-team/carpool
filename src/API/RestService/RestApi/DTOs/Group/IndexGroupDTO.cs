using System;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace RestApi.DTOs.Group
{
	public class IndexGroupDTO
	{
		public IndexGroupDTO(GroupId id, Location location, string name, int rideCount, int userCount) : this(id, name,
			rideCount, userCount)
			=> Location = location;

		public IndexGroupDTO(GroupId id, string name, int rideCount, int userCount) : this()
		{
			Id = id;
			Name = name;
			RideCount = rideCount;
			UserCount = userCount;
		}

		public IndexGroupDTO()
		{
		}

		public int UserCount { get; }

		public GroupId Id { get; set; }

		public Location Location { get; set; }

		public string Name { get; set; }

		public int RideCount { get; set; }
	}
}
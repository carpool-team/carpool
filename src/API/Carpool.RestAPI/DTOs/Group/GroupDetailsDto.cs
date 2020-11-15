using System;
using System.Collections.Generic;
using Carpool.Core.ValueObjects;
using Carpool.RestAPI.DTOs.Ride;
using Carpool.RestAPI.DTOs.User;

namespace Carpool.RestAPI.DTOs.Group
{
    public class GroupDetailsDto
	{
		public GroupDetailsDto(Guid groupId,
		                       Location location,
		                       List<RideMinimalDto> rides,
		                       string name,
		                       string code,
		                       Core.Models.ApplicationUser owner,
		                       int userCount,
		                       int rideCount)
		{
			GroupId = groupId;
			Location = location;
			Rides = rides;
			Name = name;
			Code = code;
			UserCount = userCount;
			RideCount = rideCount;
			Owner = new IndexUserDto(owner.Id, owner.FirstName, owner.LastName, owner.Vehicle);
		}

		public Guid GroupId { get; }
		public Location? Location { get; }
		public List<RideMinimalDto> Rides { get; }
		public string Name { get; }
		public string Code { get; }
		public IndexUserDto Owner { get; }
		public int UserCount { get; }
		public int RideCount { get; }
	}
}
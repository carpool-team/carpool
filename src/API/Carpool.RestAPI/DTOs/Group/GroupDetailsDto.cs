using System;
using System.Collections.Generic;
using Carpool.Core.Models;
using Carpool.RestAPI.DTOs.RideDTOs;
using Carpool.RestAPI.DTOs.UserDTOs;

namespace Carpool.RestAPI.DTOs.GroupDTOs
{
	public class GroupDetailsDto
	{
		public GroupDetailsDto(Guid groupId,
		                       Location location,
		                       List<RideMinimalDto> rides,
		                       string name,
		                       string code,
		                       User owner,
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
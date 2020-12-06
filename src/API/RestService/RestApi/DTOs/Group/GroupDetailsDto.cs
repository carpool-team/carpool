using System.Collections.Generic;
using Domain.Entities;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using RestApi.DTOs.Ride;
using RestApi.DTOs.User;

namespace RestApi.DTOs.Group
{
	public class GroupDetailsDto
	{
		public GroupDetailsDto(GroupId groupId,
			Location location,
			List<RideMinimalDto> rides,
			string name,
			string code,
			ApplicationUser owner,
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

		public GroupId GroupId { get; }
		public Location? Location { get; }
		public List<RideMinimalDto> Rides { get; }
		public string Name { get; }
		public string Code { get; }
		public IndexUserDto Owner { get; }
		public int UserCount { get; }
		public int RideCount { get; }
	}
}
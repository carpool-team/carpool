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
		                       User owner)
		{
			GroupId = groupId;
			Location = location;
			Rides = rides;
			Name = name;
			Code = code;
			Owner = new IndexUserDto(owner.Id, owner.FirstName, owner.LastName, owner.Vehicle);
		}

		public Guid GroupId { get; set; }
		public Location Location { get; set; }
		public List<RideMinimalDto> Rides { get; set; }
		public string Name { get; set; }
		public string Code { get; set; }
		public IndexUserDto Owner { get; set; }
	}
}
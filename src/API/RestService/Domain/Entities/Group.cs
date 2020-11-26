using System;
using System.Collections.Generic;
using Domain.Abstract;
using Domain.Entities.Intersections;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class Group : BaseEntity<GroupId>
	{
		public IReadOnlyList<UserGroup> UserGroups { get; set; }

		public Location Location { get; set; }

		public IReadOnlyList<Ride> Rides { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }
		public ApplicationUser Owner { get; set; }
		public UserId OwnerId { get; set; }
	}
}
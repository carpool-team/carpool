using System;
using System.Collections.Generic;
using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;
using Carpool.Core.ValueObjects;

namespace Carpool.Core.Models
{
    public class Group : BaseEntity<Guid>
	{
		public IReadOnlyList<UserGroup> UserGroups { get; set; }

		public Location Location { get; set; }

		public IReadOnlyList<Ride> Rides { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }
		public User Owner { get; set; }
		public Guid OwnerId { get; set; }
	}
}
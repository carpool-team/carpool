using System;
using System.Collections.Generic;
using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;

namespace Carpool.Core.Models
{
	public class Group : BaseEntity<Guid>
	{
		//public List<UserGroup> UserGroups { get; set; }

		public Guid? LocationId { get; set; }
		public Location Location { get; set; }

		//public List<Ride> Rides { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }
		public User Owner { get; set; }
		public Guid OwnerId { get; set; }
	}
}
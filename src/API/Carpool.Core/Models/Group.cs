using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Group : ParentModel
	{
		public List<UserGroup> UserGroups { get; set; }

		public Location Location { get; set; }

		public List<Ride> Rides { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }
	}
}
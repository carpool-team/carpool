using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class User : ParentModel
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string PhoneNumber { get; set; }

		public List<Location> Locations { get; set; }

		public List<UserGroup> UserGroups { get; set; }

		public List<RideRequest> RideRequests { get; set; }

		public List<Ride> CreatedRides { get; set; }

		public List<UserParticipatedRide> ParticipatedRides { get; set; }
	}
}
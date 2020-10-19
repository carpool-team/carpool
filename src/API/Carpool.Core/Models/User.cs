using System;
using System.Collections.Generic;
using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;
using Microsoft.AspNetCore.Identity;

namespace Carpool.Core.Models
{
	public class User : IdentityUser<Guid>, IBaseEntity<Guid>
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public List<Location> Locations { get; set; }

		public List<UserGroup> UserGroups { get; set; }

		public List<RideRequest> RideRequests { get; set; }

		public List<Ride> CreatedRides { get; set; }

		public List<UserParticipatedRide> ParticipatedRides { get; set; }

		public List<Rating> Ratings { get; set; }

		public Guid? VehicleId { get; set; }
		public Vehicle Vehicle { get; set; }

		public List<GroupInvite> GroupInvites { get; set; }

		public List<GroupInvite> SentGroupInvites { get; set; }
		public int CompanyId { get; set; }
	}
}
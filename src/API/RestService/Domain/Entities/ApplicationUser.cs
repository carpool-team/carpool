using System;
using System.Collections.Generic;
using Domain.Contracts;
using Domain.Entities.Intersections;
using Domain.ValueObjects;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
	public sealed class ApplicationUser : IdentityUser<Guid>, IBaseEntity<Guid>
	{
		public ApplicationUser(string email, string userName, string firstName, string lastName)
			=> (Email, UserName, FirstName, LastName)
			   = (email, userName, firstName, lastName);

		public string FirstName { get; set; }

		public string LastName { get; set; }

		//public List<Location> Locations { get; set; }

		public IReadOnlyList<UserGroup> UserGroups { get; set; } = new List<UserGroup>();

		//public List<RideRequest> RideRequests { get; set; }

		//public List<Ride> CreatedRides { get; set; }

		//public ICollection<UserParticipatedRide> ParticipatedRides { get; set; }

		public List<Rating> Ratings { get; set; } = new();

		public Guid? VehicleId { get; set; }
		public Vehicle? Vehicle { get; set; }

		//public virtual ICollection<GroupInvite> ReceivedGroupInvites { get; set; }

		//public virtual ICollection<GroupInvite> SentGroupInvites { get; set; }
	}
}
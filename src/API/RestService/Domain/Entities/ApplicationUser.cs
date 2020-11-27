using System.Collections.Generic;
using Domain.Abstract;
using Domain.Contracts;
using Domain.Entities.Intersections;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
	public sealed class ApplicationUser : BaseEntity<UserId>
	{
		public ApplicationUser(UserId id, string email, string firstName, string lastName)
			=> (Id, Email, FirstName, LastName)
				= (id, email, firstName, lastName);

		public string Email { get; set; }
		public string FirstName { get; set; }

		public string LastName { get; set; }

		//public List<Location> Locations { get; set; }

		public IReadOnlyList<UserGroup> UserGroups { get; set; } = new List<UserGroup>();

		//public List<RideRequest> RideRequests { get; set; }

		//public List<Ride> CreatedRides { get; set; }

		//public ICollection<UserParticipatedRide> ParticipatedRides { get; set; }

		public List<Rating> Ratings { get; set; } = new();

		public Vehicle? Vehicle { get; set; }

		//public virtual ICollection<GroupInvite> ReceivedGroupInvites { get; set; }

		//public virtual ICollection<GroupInvite> SentGroupInvites { get; set; }
	}
}
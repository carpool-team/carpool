using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Carpool.Core.Abstract;
using Carpool.Core.Contracts;
using Carpool.Core.Models.Intersections;
using Carpool.Core.ValueObjects;
using Microsoft.AspNetCore.Identity;

namespace Carpool.Core.Models
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

        public List<Rating> Ratings { get; set; } = new List<Rating>();

		public Guid? VehicleId { get; set; }
		public Vehicle? Vehicle { get; set; }
		
		//public virtual ICollection<GroupInvite> ReceivedGroupInvites { get; set; }

		//public virtual ICollection<GroupInvite> SentGroupInvites { get; set; }
    }
}
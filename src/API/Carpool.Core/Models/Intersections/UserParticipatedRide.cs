using System;

namespace Carpool.Core.Models.Intersections
{
	public class UserParticipatedRide
	{
		public Guid UserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public Guid RideId { get; set; }
		public Ride Ride { get; set; }
	}
}
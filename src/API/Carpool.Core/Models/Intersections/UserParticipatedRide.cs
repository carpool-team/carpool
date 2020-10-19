using System;

namespace Carpool.Core.Models.Intersections
{
	public class UserParticipatedRide
	{
		public Guid UserId { get; set; }
		public Guid RideId { get; set; }
	}
}
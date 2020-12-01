using IdentifiersShared.Identifiers;

namespace Domain.Entities.Intersections
{
	public class UserParticipatedRide
	{
		public AppUserId AppUserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public RideId RideId { get; set; }
		public Ride Ride { get; set; }
	}
}
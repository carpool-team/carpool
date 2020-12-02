using IdentifiersShared.Identifiers;

namespace Domain.Entities.Intersections
{
	public class UserParticipatedRide
	{
		public UserParticipatedRide(AppUserId appUserId, RideId rideId)
		{
			AppUserId = appUserId;
			RideId = rideId;
		}
		public AppUserId AppUserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public RideId RideId { get; set; }
		public Ride Ride { get; set; }
	}
}
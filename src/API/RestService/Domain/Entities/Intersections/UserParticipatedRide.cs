using IdentifiersShared.Identifiers;

namespace Domain.Entities.Intersections
{
	public class UserParticipatedRide
	{
		public UserParticipatedRide(UserId userId, RideId rideId)
		{
			UserId = userId;
			RideId = rideId;
		}
		public UserId UserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public RideId RideId { get; set; }
		public Ride Ride { get; set; }
	}
}
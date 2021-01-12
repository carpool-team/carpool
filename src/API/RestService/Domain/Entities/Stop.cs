using Domain.Abstract;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class Stop : BaseEntity
	{
		public Stop(AppUserId participantId,
		            Location location,
		            RideId rideId)
		{
			ParticipantId = participantId;
			Location = location;
			RideId = rideId;
		}

		private Stop()
		{
		}

		public AppUserId ParticipantId { get; set; }
		public ApplicationUser Participant { get; set; }
		public Location Location { get; set; }
		public RideId RideId { get; set; }
	}
}
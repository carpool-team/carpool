using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class AddRideParticipandCommand : IRequest
	{
		[JsonConstructor]
		public AddRideParticipandCommand(RideId? rideId, UserId participantId)
		{
			RideId = rideId;
			ParticipantId = participantId;
		}

		public RideId? RideId { get; set; }
		public UserId ParticipantId { get; set; }
	}
}
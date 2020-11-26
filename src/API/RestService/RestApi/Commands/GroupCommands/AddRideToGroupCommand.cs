using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class AddRideToGroupCommand : IRequest
	{
		[JsonConstructor]
		public AddRideToGroupCommand(RideId rideId, GroupId groupId)
		{
			RideId = rideId;
			GroupId = groupId;
		}

		public RideId RideId { get; set; }
		public GroupId GroupId { get; set; }
	}
}
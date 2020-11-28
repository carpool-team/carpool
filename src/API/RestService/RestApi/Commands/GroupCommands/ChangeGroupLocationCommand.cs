using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class ChangeGroupLocationCommand : IRequest
	{
		[JsonConstructor]
		public ChangeGroupLocationCommand(GroupId groupId, double longitude, double latitude)
			=> (GroupId, Longitude, Latitude) = (groupId, longitude, latitude);

		public double Longitude { get; }
		public double Latitude { get; }
		public GroupId GroupId { get; }
	}
}
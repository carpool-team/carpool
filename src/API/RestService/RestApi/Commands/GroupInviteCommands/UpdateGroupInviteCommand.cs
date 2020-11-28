using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class UpdateGroupInviteCommand : IRequest
	{
		[JsonConstructor]
		public UpdateGroupInviteCommand(GroupInviteId groupInviteId, bool isAccepted)
		{
			GroupInviteId = groupInviteId;
			IsAccepted = isAccepted;
		}

		public GroupInviteId GroupInviteId { get; set; }

		public bool IsAccepted { get; set; }
	}
}
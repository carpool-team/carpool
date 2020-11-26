using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class DeleteGroupInviteCommand : IRequest<GroupInviteId>
	{
		[JsonConstructor]
		public DeleteGroupInviteCommand(GroupInviteId groupInviteId)
			=> GroupInviteId = groupInviteId;

		public GroupInviteId GroupInviteId { get; set; }
	}
}
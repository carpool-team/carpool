using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class AddGroupInviteCommand : IRequest<GroupInviteId>
	{
		[JsonConstructor]
		public AddGroupInviteCommand(GroupId groupId, UserId invitedUserId, UserId inviterId)
		{
			GroupId = groupId;
			InvitedUserId = invitedUserId;
			InviterId = inviterId;
		}

		public GroupId GroupId { get; set; }

		public UserId InvitedUserId { get; set; }

		public UserId InviterId { get; set; }
	}
}
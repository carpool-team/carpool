using System;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class AddGroupInviteCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public AddGroupInviteCommand(Guid groupId, Guid invitedUserId, Guid inviterId)
		{
			GroupId = groupId;
			InvitedUserId = invitedUserId;
			InviterId = inviterId;
		}

		public Guid GroupId { get; set; }

		public Guid InvitedUserId { get; set; }

		public Guid InviterId { get; set; }
	}
}
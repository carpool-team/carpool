using System;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Commands.GroupCommands
{
	public class AddUserToGroupCommand : IRequest
	{
		public AddUserToGroupCommand(GroupId? groupId, UserId userId)
		{
			GroupId = groupId;
			UserId = userId;
		}

		public UserId UserId { get; set; }

		public GroupId? GroupId { get; set; }
	}
}
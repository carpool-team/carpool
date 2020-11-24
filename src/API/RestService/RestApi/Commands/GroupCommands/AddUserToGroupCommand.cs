using System;
using MediatR;

namespace RestApi.Commands.GroupCommands
{
	public class AddUserToGroupCommand : IRequest
	{
		public AddUserToGroupCommand(Guid? groupId, Guid userId)
		{
			GroupId = groupId;
			UserId = userId;
		}

		public Guid UserId { get; set; }

		public Guid? GroupId { get; set; }
	}
}
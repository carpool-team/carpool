using System;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Commands.GroupCommands
{
	public class DeleteGroupCommand : IRequest
	{
		public DeleteGroupCommand(GroupId groupId)
			=> GroupId = groupId;

		public GroupId GroupId { get; set; }
	}
}
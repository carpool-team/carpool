using System;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class DeleteGroupInviteCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public DeleteGroupInviteCommand(Guid groupInviteId)
			=> GroupInviteId = groupInviteId;

		public Guid GroupInviteId { get; set; }
	}
}
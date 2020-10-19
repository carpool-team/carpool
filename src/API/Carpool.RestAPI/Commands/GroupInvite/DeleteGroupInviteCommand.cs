using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.GroupInvite
{
	public class DeleteGroupInviteCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public DeleteGroupInviteCommand(Guid groupInviteId)
			=> GroupInviteId = groupInviteId;

		public Guid GroupInviteId { get; set; }
	}
}
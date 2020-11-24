using System;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class UpdateGroupInviteCommand : IRequest
	{
		[JsonConstructor]
		public UpdateGroupInviteCommand(Guid? groupInviteId, bool isAccepted)
		{
			GroupInviteId = groupInviteId;
			IsAccepted = isAccepted;
		}

		public Guid? GroupInviteId { get; set; }

		public bool IsAccepted { get; set; }
	}
}
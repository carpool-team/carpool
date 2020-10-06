using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.GroupInvite
{
	public class UpdateGroupInviteCommand : IRequest
	{
		[JsonConstructor]
		public UpdateGroupInviteCommand(Guid groupInviteId, bool isAccepted)
		{
			GroupInviteId = groupInviteId;
			IsAccepted = isAccepted;
		}
		
		public Guid GroupInviteId { get; set; }

		public bool IsAccepted { get; set; }
	}
}
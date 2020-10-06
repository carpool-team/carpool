using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class GetGroupInviteQuery : IRequest<Core.Models.GroupInvite>
	{
		[JsonConstructor]
		public GetGroupInviteQuery(Guid groupInviteId)
			=> GroupInviteId = groupInviteId;

		public Guid GroupInviteId { get; set; }
	}
}
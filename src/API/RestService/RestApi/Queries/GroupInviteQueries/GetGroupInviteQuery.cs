using System;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetGroupInviteQuery : IRequest<GroupInvite>
	{
		[JsonConstructor]
		public GetGroupInviteQuery(Guid groupInviteId)
			=> GroupInviteId = groupInviteId;

		public Guid GroupInviteId { get; set; }
	}
}
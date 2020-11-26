using System;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetGroupInviteQuery : IRequest<GroupInvite>
	{
		[JsonConstructor]
		public GetGroupInviteQuery(GroupInviteId groupInviteId)
			=> GroupInviteId = groupInviteId;

		public GroupInviteId GroupInviteId { get; set; }
	}
}
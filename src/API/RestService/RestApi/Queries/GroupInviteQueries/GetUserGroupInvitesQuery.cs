using System;
using System.Collections.Generic;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetUserGroupInvitesQuery : IRequest<IEnumerable<GroupInvite>>
	{
		[JsonConstructor]
		public GetUserGroupInvitesQuery(Guid userId)
			=> UserId = userId;

		public Guid UserId { get; set; }
	}
}
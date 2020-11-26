using System.Collections.Generic;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetUserGroupInvitesQuery : IRequest<IEnumerable<GroupInvite>>
	{
		[JsonConstructor]
		public GetUserGroupInvitesQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; set; }
	}
}
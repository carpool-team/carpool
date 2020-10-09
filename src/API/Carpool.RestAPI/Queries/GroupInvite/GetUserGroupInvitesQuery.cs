using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class GetUserGroupInvitesQuery : IRequest<IEnumerable<Core.Models.GroupInvite>>
	{
		[JsonConstructor]
		public GetUserGroupInvitesQuery(Guid userId)
		{
			UserId = userId;
		}

		public Guid UserId { get; set; }
	}
}
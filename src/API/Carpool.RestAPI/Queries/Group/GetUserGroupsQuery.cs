using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<Core.Models.Group>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(Guid userId)
			=> UserId = userId;

		public Guid UserId { get; set; }
	}
}
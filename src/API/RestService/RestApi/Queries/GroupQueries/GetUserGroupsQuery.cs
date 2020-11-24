using System;
using System.Collections.Generic;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupQueries
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<Group>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(Guid userId)
			=> UserId = userId;

		public Guid UserId { get; set; }
	}
}
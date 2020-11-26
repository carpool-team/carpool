using System.Collections.Generic;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupQueries
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<Group>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; set; }
	}
}
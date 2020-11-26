using System;
using System.Collections.Generic;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;
using RestApi.DTOs.User;

namespace RestApi.Queries.UserQueries
{
	public class GetGroupUsersQuery : IRequest<List<IndexUserDto>>
	{
		[JsonConstructor]
		public GetGroupUsersQuery(GroupId id)
			=> Id = id;

		public GroupId Id { get; set; }
	}
}
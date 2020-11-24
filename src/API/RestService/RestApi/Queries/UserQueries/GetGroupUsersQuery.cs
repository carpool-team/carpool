using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;
using RestApi.DTOs.User;

namespace RestApi.Queries.UserQueries
{
	public class GetGroupUsersQuery : IRequest<List<IndexUserDto>>
	{
		[JsonConstructor]
		public GetGroupUsersQuery(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}
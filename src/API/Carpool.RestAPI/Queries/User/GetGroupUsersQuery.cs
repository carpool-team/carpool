using System;
using System.Collections.Generic;
using Carpool.RestAPI.DTOs.User;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.User
{
	public class GetGroupUsersQuery : IRequest<List<IndexUserDto>>
	{
		[JsonConstructor]
		public GetGroupUsersQuery(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}
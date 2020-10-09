using System;
using System.Collections.Generic;
using Carpool.Core.DTOs.UserDTOs;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.User
{
	public class GetGroupUsersQuery : IRequest<IAsyncEnumerable<IndexUserDTO>>
	{
		[JsonConstructor]
		public GetGroupUsersQuery(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}
using System;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.UserQueries
{
	public class GetUserByIdQuery : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public GetUserByIdQuery(Guid userId)
			=> UserId = userId;

		public Guid UserId { get; set; }
	}
}
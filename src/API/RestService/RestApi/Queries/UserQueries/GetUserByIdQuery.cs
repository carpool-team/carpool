using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.UserQueries
{
	public class GetUserByIdQuery : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public GetUserByIdQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; set; }
	}
}
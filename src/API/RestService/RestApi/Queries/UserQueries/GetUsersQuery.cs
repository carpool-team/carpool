using System.Collections.Generic;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.UserQueries
{
	public class GetUsersQuery : IRequest<List<ApplicationUser>>
	{
	}
}
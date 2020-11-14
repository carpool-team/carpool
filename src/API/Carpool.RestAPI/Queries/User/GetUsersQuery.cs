using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.User
{
	public class GetUsersQuery : IRequest<List<Core.Models.User>>
	{
	}
}
using System.Collections.Generic;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class GetRidesQuery : IRequest<IEnumerable<Ride>>
	{
	}
}
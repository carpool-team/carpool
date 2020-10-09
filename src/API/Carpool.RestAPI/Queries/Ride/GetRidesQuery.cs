using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetRidesQuery : IRequest<IEnumerable<Core.Models.Ride>>
	{
	}
}
using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.RideRequest
{
	public class GetRideRequestsQuery : IRequest<IEnumerable<Core.Models.RideRequest>>
	{
	}
}
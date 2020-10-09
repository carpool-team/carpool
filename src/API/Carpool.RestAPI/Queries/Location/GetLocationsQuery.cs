using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.Location
{
	public class GetLocationsQuery : IRequest<IEnumerable<Core.Models.Location>>
	{
	}
}
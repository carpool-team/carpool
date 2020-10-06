using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using MediatR;

namespace Carpool.RestAPI.Queries.Location
{
	public class GetLocationsQueryHandler : IRequestHandler<GetLocationsQuery, IEnumerable<Core.Models.Location>>
	{
		private readonly ILocationRepository _repository;

		public GetLocationsQueryHandler(ILocationRepository repository)
		{
			_repository = repository;
		}

		public async Task<IEnumerable<Core.Models.Location>> Handle(GetLocationsQuery request,
		                                                            CancellationToken cancellationToken)
			=> await _repository.GetPartAsNoTrackingAsync(cancellationToken).ConfigureAwait(false);
	}
}
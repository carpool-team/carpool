using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetRidesQueryHandler : IRequestHandler<GetRidesQuery, IEnumerable<Core.Models.Ride>>
	{
		private readonly IRideRepository _repository;

		public GetRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Core.Models.Ride>> Handle(GetRidesQuery request,
		                                                        CancellationToken cancellationToken)
		{
			var rides = await _repository.GetPartAsNoTrackingAsync(cancellationToken).ConfigureAwait(false);
			return rides;
		}
	}
}
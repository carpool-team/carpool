using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Ride;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class
		GetUserOwnedRidesQueryHandler : IRequestHandler<GetUserOwnedRidesQuery, IEnumerable<Ride>>
	{
		private readonly IRideRepository _repository;

		public GetUserOwnedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Ride>> Handle(GetUserOwnedRidesQuery request,
		                                                                CancellationToken cancellationToken)
			=> await _repository.GetOwnedRidesByUserIdAsNoTrackingAsync(request.UserId, request.Past, cancellationToken)
			                    .ConfigureAwait(false);
	}
}
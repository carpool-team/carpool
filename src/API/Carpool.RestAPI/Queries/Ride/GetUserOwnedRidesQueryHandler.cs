using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetUserOwnedRidesQueryHandler : IRequestHandler<GetUserOwnedRidesQuery, IEnumerable<Core.Models.Ride>>
	{
		private readonly IRideRepository _repository;

		public GetUserOwnedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Core.Models.Ride>> Handle(GetUserOwnedRidesQuery request,
		                                                        CancellationToken cancellationToken)
			=> await _repository.GetOwnedRidesByUserIdAsNoTrackingAsync(request.UserId, request.Past, cancellationToken)
			                    .ConfigureAwait(false);
	}
}
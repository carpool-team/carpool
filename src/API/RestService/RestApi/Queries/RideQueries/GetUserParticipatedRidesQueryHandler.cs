using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Ride;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class
		GetUserParticipatedRidesQueryHandler : IRequestHandler<GetUserParticipatedRidesQuery,
			IEnumerable<Ride>>
	{
		private readonly IRideRepository _repository;

		public GetUserParticipatedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Ride>> Handle(GetUserParticipatedRidesQuery request,
		                                                                CancellationToken cancellationToken)
		{
			var userRides =
				await _repository.GetParticipatedRidesByUserIdAsNoTrackingAsync(request.UserId, request.Past,
					cancellationToken).ConfigureAwait(false);

			return userRides;
		}
	}
}
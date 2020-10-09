using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetUserParticipatedRidesQueryHandler : IRequestHandler<GetUserParticipatedRidesQuery, IEnumerable<Core.Models.Ride>>
	{
		private readonly IRideRepository _repository;

		public GetUserParticipatedRidesQueryHandler(IRideRepository repository)
		{
			_repository = repository;
		}

		public async Task<IEnumerable<Core.Models.Ride>> Handle(GetUserParticipatedRidesQuery request,
		                                                  CancellationToken cancellationToken)
		{
			var userRides =
				await _repository.GetParticipatedRidesByUserIdAsNoTrackingAsync(request.UserId, request.Past,
					cancellationToken).ConfigureAwait(false);

			return userRides;
		}
	}
}
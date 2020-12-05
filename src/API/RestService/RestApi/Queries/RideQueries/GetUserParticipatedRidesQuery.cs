using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class GetUserParticipatedRidesQuery : IRequest<IEnumerable<Ride>>
	{
		public GetUserParticipatedRidesQuery(AppUserId appUserId, bool past)
		{
			AppUserId = appUserId;
			Past = past;
		}

		public AppUserId AppUserId { get; }
		public bool Past { get; }
	}
	
	public class GetUserParticipatedRidesQueryHandler 
		: IRequestHandler<GetUserParticipatedRidesQuery,
			IEnumerable<Ride>>
	{
		private readonly IRideRepository _repository;

		public GetUserParticipatedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Ride>> Handle(GetUserParticipatedRidesQuery request,
			CancellationToken cancellationToken)
		{
			var userRides =
				await _repository.GetParticipatedRidesByUserIdAsNoTrackingAsync(request.AppUserId, request.Past,
						cancellationToken)
					.ConfigureAwait(false);

			return userRides;
		}
	}
}
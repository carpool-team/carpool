using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Ride;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class GetUserOwnedRidesQuery : IRequest<IEnumerable<Ride>>
	{
		public GetUserOwnedRidesQuery(AppUserId appUserId, bool past)
		{
			AppUserId = appUserId;
			Past = past;
		}

		public AppUserId AppUserId { get; }
		public bool Past { get; }
	}
	
	public class GetUserOwnedRidesQueryHandler 
		: IRequestHandler<GetUserOwnedRidesQuery, IEnumerable<Ride>>
	{
		private readonly IRideRepository _repository;

		public GetUserOwnedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Ride>> Handle(GetUserOwnedRidesQuery request,
			CancellationToken cancellationToken)
			=> await _repository.GetOwnedRidesByUserIdAsNoTrackingAsync(request.AppUserId, request.Past, cancellationToken)
				.ConfigureAwait(false);
	}
}
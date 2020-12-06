using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.RideQueries
{
	public class GetRideQuery : IRequest<Ride>
	{
		[JsonConstructor]
		public GetRideQuery(RideId rideId)
			=> RideId = rideId;

		public RideId RideId { get; }
	}
	
	public class GetRideQueryHandler : IRequestHandler<GetRideQuery, Ride>
	{
		private readonly IRideRepository _repository;

		public GetRideQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<Ride> Handle(GetRideQuery request, CancellationToken cancellationToken)
		{
			var ride = await _repository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			_ = ride ?? throw new NullReferenceException(nameof(ride));
			return ride;
		}
	}
}
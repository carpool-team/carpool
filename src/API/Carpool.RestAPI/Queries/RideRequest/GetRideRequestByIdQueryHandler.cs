using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.RideRequest;
using MediatR;

namespace Carpool.RestAPI.Queries.RideRequest
{
	public class GetRideRequestByIdQueryHandler : IRequestHandler<GetRideRequestByIdQuery, Core.Models.RideRequest>
	{
		private readonly IRideRequestRepository _repository;

		public GetRideRequestByIdQueryHandler(IRideRequestRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.RideRequest> Handle(GetRideRequestByIdQuery request,
		                                                  CancellationToken cancellationToken)
		{
			var rideRequest = await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken)
			                                   .ConfigureAwait(false);

			_ = rideRequest ?? throw new NullReferenceException(nameof(rideRequest));
			return rideRequest;
		}
	}
}
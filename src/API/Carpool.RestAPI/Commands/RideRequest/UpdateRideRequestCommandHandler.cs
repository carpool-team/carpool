using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using Carpool.DAL.Repositories.Ride;
using Carpool.DAL.Repositories.RideRequest;
using MediatR;

namespace Carpool.RestAPI.Commands.RideRequest
{
	public class UpdateRideRequestCommandHandler : AsyncRequestHandler<UpdateRideRequestCommand>
	{
		private readonly IRideRequestRepository _rideRequestRepository;
		private readonly ILocationRepository _locationRepository;

		public UpdateRideRequestCommandHandler(IRideRequestRepository rideRequestRepository, ILocationRepository locationRepository)
		{
			_rideRequestRepository = rideRequestRepository;
			_locationRepository = locationRepository;
		}

		protected override async Task Handle(UpdateRideRequestCommand request, CancellationToken cancellationToken)
		{
			var rideRequest = await _rideRequestRepository.GetByIdAsync((Guid) request.RideRequestId, cancellationToken).ConfigureAwait(false);

			rideRequest.Date = request.Date ?? rideRequest.Date;
			rideRequest.RequesterId = request.RequesterId ?? rideRequest.RequesterId;

			if (request.DestinationId != null)
			{
				var destination = await _locationRepository.GetByIdAsync((Guid) request.DestinationId, cancellationToken).ConfigureAwait(false);
				rideRequest.DestinationId = destination?.Id ?? throw new NullReferenceException(nameof(destination));
			}
			else
			{
				_ = request.Destination ?? throw new NullReferenceException(nameof(request.Destination));
				var destination = await _locationRepository.GetByCoordsAsync(request.Destination.Longitude,
					                  request.Destination.Latitude, cancellationToken).ConfigureAwait(false);

				rideRequest.DestinationId = destination?.Id ?? throw new NullReferenceException(nameof(destination));
			}
			
			if (request.StartingLocationId != null)
			{
				var startingLocation = await _locationRepository.GetByIdAsync((Guid) request.StartingLocationId, cancellationToken).ConfigureAwait(false);
				rideRequest.DestinationId = startingLocation?.Id ?? throw new NullReferenceException(nameof(startingLocation));
			}
			else
			{
				_ = request.StartingLocation ?? throw new NullReferenceException(nameof(request.StartingLocation));
				var destination = await _locationRepository.GetByCoordsAsync(request.StartingLocation.Longitude,
					                  request.StartingLocation.Latitude, cancellationToken).ConfigureAwait(false);

				rideRequest.DestinationId = destination?.Id ?? throw new NullReferenceException(nameof(destination));
			}

			await _locationRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}
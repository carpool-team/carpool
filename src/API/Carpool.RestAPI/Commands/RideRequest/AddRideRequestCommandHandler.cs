using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using Carpool.DAL.Repositories.RideRequest;
using MediatR;

namespace Carpool.RestAPI.Commands.RideRequest
{
	public class AddRideRequestCommandHandler : IRequestHandler<AddRideRequestCommand, Core.Models.RideRequest>
	{
		private readonly IRideRequestRepository _rideRequestRepository;
		private readonly ILocationRepository _locationRepository;

		public AddRideRequestCommandHandler(IRideRequestRepository rideRequestRepository, ILocationRepository locationRepository)
		{
			_rideRequestRepository = rideRequestRepository;
			_locationRepository = locationRepository;
		}

		public async Task<Core.Models.RideRequest> Handle(AddRideRequestCommand request, CancellationToken cancellationToken)
		{
			var rideRequest = new Core.Models.RideRequest()
			{
				Date = request.Date
			};

			if (request.DestinationId != null)
			{
				var destination = await _locationRepository.GetByIdAsync((Guid) request.DestinationId, cancellationToken).ConfigureAwait(false);
				rideRequest.Destination = destination ?? throw new NullReferenceException(nameof(destination));
			}
			else
			{
				var destination = await _locationRepository
				                    .GetByCoordsAsync(request.Destination.Longitude, request.Destination.Latitude,
					                    cancellationToken).ConfigureAwait(false);

				rideRequest.Destination = destination ?? new Core.Models.Location()
				{
					Longitude = request.Destination.Longitude, Latitude = request.Destination.Latitude,
					Name = request.Destination.Name
				};
			}
			if (request.StartingLocationId != null)
			{
				var startingLocation = await _locationRepository.GetByIdAsync((Guid) request.StartingLocationId, cancellationToken).ConfigureAwait(false);
				rideRequest.StartingLocation = startingLocation ?? throw new NullReferenceException(nameof(startingLocation));
			}
			else
			{
				var startingLocation = await _locationRepository
				                             .GetByCoordsAsync(request.StartingLocation.Longitude, request.StartingLocation.Latitude,
					                             cancellationToken).ConfigureAwait(false);

				rideRequest.StartingLocation = startingLocation ?? new Core.Models.Location()
				{
					Longitude = request.StartingLocation.Longitude, Latitude = request.StartingLocation.Latitude,
					Name = request.StartingLocation.Name
				};
			}

			rideRequest.RequesterId = request.RequesterId ?? throw new NullReferenceException(nameof(request.RequesterId));
			await _rideRequestRepository.AddAsync(rideRequest, cancellationToken).ConfigureAwait(false);
			await _rideRequestRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return rideRequest;
		}
	}
}
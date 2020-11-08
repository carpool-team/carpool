using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Location;
using Carpool.DAL.Repositories.Ride;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideCommandHandler : IRequestHandler<AddRideCommand, Core.Models.Ride>
	{
		private readonly IRideRepository _rideRepository;
		private readonly ILocationRepository _locationRepository;

		public AddRideCommandHandler(IRideRepository rideRepository, ILocationRepository locationRepository)
		{
			_rideRepository = rideRepository;
			_locationRepository = locationRepository;
		}

		public async Task<Core.Models.Ride> Handle(AddRideCommand request, CancellationToken cancellationToken)
		{
			var ride = new Core.Models.Ride
			{
				OwnerId = request.OwnerId,
				GroupId = request.GroupId,
				Date = request.Date,
				Price = request.Price
			};

			if (request.StartingLocationId != null)
			{
				_ = await _locationRepository.AnyWithId((Guid) request.StartingLocationId).ConfigureAwait(false) ?
					    true :
					    throw new ApiException($"Location with id: {request.StartingLocationId} does not exist");

				ride.StartingLocationId = (Guid) request.StartingLocationId;
			}
			else
			{
				if (request.StartingLocationLongitude != null && request.StartingLocationLatitude != null)
						ride.StartingLocation = new Core.Models.Location((double) request.StartingLocationLongitude,
							(double) request.StartingLocationLatitude);
				else
					throw new ApiException($"Starting locations longitude and/or latitude must have a value");
			}
			
			if (request.DestinationId != null)
			{
				_ = await _locationRepository.AnyWithId((Guid) request.DestinationId).ConfigureAwait(false) ?
					    true :
					    throw new ApiException($"Location with id: {request.DestinationId} does not exist");

				ride.StartingLocationId = (Guid) request.DestinationId;
			}
			else
			{
				if (request.DestinationLongitude != null && request.DestinationLatitude != null)
					ride.Destination = new Core.Models.Location((double) request.DestinationLongitude,
						(double) request.DestinationLatitude);
				else
					throw new ApiException($"Destinations longitude and/or latitude must have a value");
			}
			
			await _rideRepository.AddAsync(ride, cancellationToken).ConfigureAwait(false);
			try
			{
				await _rideRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
			return ride;
		}
	}
}
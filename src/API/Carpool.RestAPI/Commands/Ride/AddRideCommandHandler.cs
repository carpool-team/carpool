using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Ride;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideCommandHandler : IRequestHandler<AddRideCommand, Core.Models.Ride>
	{
		private readonly IRideRepository _rideRepository;

		public AddRideCommandHandler(IRideRepository rideRepository)
		{
			_rideRepository = rideRepository;
		}

		public async Task<Core.Models.Ride> Handle(AddRideCommand request, CancellationToken cancellationToken)
		{
			var ride = new Core.Models.Ride
			{
				OwnerId = request.OwnerId,
				GroupId = request.GroupId,
				Date = request.Date,
				Price = request.Price,
				Destination = request.Destination ?? throw new ApiProblemDetailsException($"Ride must have a destination", StatusCodes.Status400BadRequest),
				StartingLocation = request.StartingLocation ?? throw new ApiProblemDetailsException($"Ride must have a starting location", StatusCodes.Status400BadRequest)
			};			
			
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
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Ride;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class DeleteRideCommand : IRequest<Ride>
	{
		[JsonConstructor]
		public DeleteRideCommand(RideId rideId)
			=> RideId = rideId;

		public RideId RideId { get; }
	}

	public class DeleteRideCommandHandler : IRequestHandler<DeleteRideCommand, Ride>
	{
		private readonly IRideRepository _rideRepository;
		public DeleteRideCommandHandler(IRideRepository rideRepository) => _rideRepository = rideRepository;

		public async Task<Ride> Handle(DeleteRideCommand request, CancellationToken cancellationToken)
		{
			var ride = await _rideRepository.GetByIdAsync(request.RideId, cancellationToken);

			_ = ride
				?? throw new ApiException($"Ride with id {request.RideId} does not exist",
					StatusCodes.Status404NotFound);

			_rideRepository.Delete(ride);

			try
			{
				await _rideRepository.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return ride;
		}
	}
}
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.RideCommands.RemoveUserFromRide
{
	public class RemoveUserFromRideCommand : IRequest
	{
		public RemoveUserFromRideCommand(RideId rideId, AppUserId appUserId, AppUserId requestingUserId)
		{
			RideId = rideId;
			AppUserId = appUserId;
			RequestingUserId = requestingUserId;
		}

		public RideId RideId { get; }
		public AppUserId AppUserId { get; }
		public AppUserId RequestingUserId { get; }
	}

	public class RemoveUserFromRideCommandHandler : AsyncRequestHandler<RemoveUserFromRideCommand>
	{
		private readonly IRideRepository _rideRepository;
		private readonly IUnitOfWork _unitOfWork;

		public RemoveUserFromRideCommandHandler(IRideRepository rideRepository, IUnitOfWork unitOfWork) 
			=> (_rideRepository, _unitOfWork)
				= (rideRepository, unitOfWork);

		protected override async Task Handle(RemoveUserFromRideCommand request, CancellationToken cancellationToken)
		{
			try
			{
				var ride = await _rideRepository.GetByIdAsync(request.RideId, cancellationToken);

				_ = ride ?? throw new ApiException($"Ride with id {request.RideId} does not exist", StatusCodes.Status404NotFound);

				if (ride.OwnerId != request.RequestingUserId
					&& request.AppUserId != request.RequestingUserId)
					throw new ApiException("User does not have permissions to remove user from ride", StatusCodes.Status403Forbidden);
				
				ride.RemoveParticipantFromRide(request.AppUserId);
				
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
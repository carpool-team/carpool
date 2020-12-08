using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.RideCommands.RemoveUserFromRide
{
	public class RemoveUserFromRideCommand : IRequest
	{
		public RemoveUserFromRideCommand(RideId rideId, AppUserId appUserId)
		{
			RideId = rideId;
			AppUserId = appUserId;
		}

		public RideId RideId { get; }
		public AppUserId AppUserId { get; }
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
				await _rideRepository.RemoveUserFromRide(request.AppUserId, request.RideId, cancellationToken);
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
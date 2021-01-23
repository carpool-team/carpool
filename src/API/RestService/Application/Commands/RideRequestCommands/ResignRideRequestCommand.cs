using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.RideRequestCommands
{
	public class ResignRideRequestCommand : IRequest
	{
		public ResignRideRequestCommand(AppUserId requestingUserId, RideRequestId rideRequestId)
		{
			RequestingUserId = requestingUserId;
			RideRequestId = rideRequestId;
		}

		public AppUserId RequestingUserId { get; }
		public RideRequestId RideRequestId { get; }
	}
	
	public class ResignRideRequestCommandHandler : AsyncRequestHandler<ResignRideRequestCommand>
	{
		private readonly IRideRequestRepository _rideRequestRepository;
		private readonly IUnitOfWork _unitOfWork;

		public ResignRideRequestCommandHandler(IRideRequestRepository rideRequestRepository, IUnitOfWork unitOfWork)
		{
			_rideRequestRepository = rideRequestRepository;
			_unitOfWork = unitOfWork;
		}

		protected override async Task Handle(ResignRideRequestCommand request, CancellationToken cancellationToken)
		{
			var rideRequest = await _rideRequestRepository.GetByIdAsync(request.RideRequestId, cancellationToken);

			if (rideRequest.RequestingUserId != request.RequestingUserId)
				throw new ApiException(StatusCodes.Status403Forbidden);
			
			_rideRequestRepository.Delete(rideRequest);

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
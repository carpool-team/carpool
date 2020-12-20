using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;

namespace RestApi.Commands.RideRequestCommands
{
	public class AddRideRequestCommand : IRequest<RideRequestId>
	{
		public AddRideRequestCommand(RideId rideId,
			AppUserId requestingUserId,
			AppUserId rideOwnerId)
		{
			RideId = rideId;
			RequestingUserId = requestingUserId;
			RideOwnerId = rideOwnerId;
		}

		public RideId RideId { get; }
		public AppUserId RequestingUserId { get; }
		public AppUserId RideOwnerId { get; }
	}

	public class AddRideRequestCommandHandler : IRequestHandler<AddRideRequestCommand, RideRequestId>
	{
		private readonly IRideRequestRepository _rideRequestRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddRideRequestCommandHandler(IRideRequestRepository rideRequestRepository, IUnitOfWork unitOfWork)
		{
			_rideRequestRepository = rideRequestRepository;
			_unitOfWork = unitOfWork;
		}

		public async Task<RideRequestId> Handle(AddRideRequestCommand request, CancellationToken cancellationToken)
		{
			IdGenerator idGenerator = new(IdGeneratorType.RideRequest);
			RideRequest rideRequest = new(new RideRequestId(idGenerator.CreateId()),
				false,
				true,
				request.RideId,
				request.RequestingUserId,
				request.RideOwnerId,
				DateTime.Now);

			await _rideRequestRepository.AddAsync(rideRequest, cancellationToken);
			await _unitOfWork.SaveAsync(cancellationToken);

			return rideRequest.Id;
		}
	}
}
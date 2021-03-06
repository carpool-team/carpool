﻿using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.ValueObjects;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;

namespace Application.Commands.RideRequestCommands
{
	public class AddRideRequestCommand : IRequest<RideRequestId>
	{
		public AddRideRequestCommand(RideId rideId,
			AppUserId requestingUserId,
			AppUserId rideOwnerId,
			Location location)
		{
			RideId = rideId;
			RequestingUserId = requestingUserId;
			RideOwnerId = rideOwnerId;
			Location = location;
		}

		public RideId RideId { get; }
		public AppUserId RequestingUserId { get; }
		public AppUserId RideOwnerId { get; }
		public Location Location { get; }
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
				DateTimeOffset.Now,
				request.Location);

			await _rideRequestRepository.AddAsync(rideRequest, cancellationToken);
			await _unitOfWork.SaveAsync(cancellationToken);

			return rideRequest.Id;
		}
	}
}
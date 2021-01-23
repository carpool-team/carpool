using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.RideCommands
{
	public class UpdateRideCommand : IRequest<Ride>
	{
		public UpdateRideCommand(RideId rideId, List<long> participantIds, DateTimeOffset? date, double? price, AppUserId appUserId)
		{
			RideId = rideId;
			ParticipantIds = participantIds;
			Date = date;
			Price = price;
			AppUserId = appUserId;
		}

		public RideId RideId { get; }
		public List<long> ParticipantIds { get; }
		public DateTimeOffset? Date { get; }
		public double? Price { get; }
		public AppUserId AppUserId { get; }
	}

	public class UpdateRideCommandHandler : IRequestHandler<UpdateRideCommand, Ride>
	{
		private readonly IRideRepository _rideRepository;
		private readonly IUnitOfWork _unitOfWork;

		public UpdateRideCommandHandler(IRideRepository rideRepository, IUnitOfWork unitOfWork)
			=> (_rideRepository, _unitOfWork)
				= (rideRepository, unitOfWork);

		public async Task<Ride> Handle(UpdateRideCommand request,
			CancellationToken cancellationToken)
		{
			var ride = await _rideRepository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			if (ride.OwnerId != request.AppUserId)
				throw new ApiException("User does not have permissions to edit other user ride.", StatusCodes.Status403Forbidden);
			ride.Date = request.Date ?? ride.Date;
			ride.Price = request.Price ?? ride.Price;
			ride.Date = request.Date ?? ride.Date;

			await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			return ride;
		}
	}
}
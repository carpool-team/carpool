using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Ride;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Commands.RideCommands
{
	public class UpdateRideCommand : IRequest<Ride>
	{
		public UpdateRideCommand(RideId rideId, List<long> participantIds, DateTime? date, double? price)
		{
			RideId = rideId;
			ParticipantIds = participantIds;
			Date = date;
			Price = price;
		}

		public RideId RideId { get; }
		public List<long> ParticipantIds { get; }
		public DateTime? Date { get; }
		public double? Price { get; }
	}

	public class UpdateRideCommandHandler : IRequestHandler<UpdateRideCommand, Ride>
	{
		private readonly IRideRepository _repository;

		public UpdateRideCommandHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<Ride> Handle(UpdateRideCommand request,
			CancellationToken cancellationToken)
		{
			var ride = await _repository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			ride.Date = request.Date ?? ride.Date;
			ride.Price = request.Price ?? ride.Price;
			ride.Date = request.Date ?? ride.Date;

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return ride;
		}
	}
}
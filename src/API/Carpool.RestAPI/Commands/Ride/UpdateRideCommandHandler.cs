using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Commands.Ride
{
	public class UpdateRideCommandHandler : IRequestHandler<UpdateRideCommand, Core.Models.Ride>
	{
		private readonly IRideRepository _repository;

		public UpdateRideCommandHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.Ride> Handle(UpdateRideCommand request, CancellationToken cancellationToken)
		{
			var ride = await _repository.GetByIdAsync((Guid) request.RideId, cancellationToken).ConfigureAwait(false);
			ride.Date = request.Date ?? ride.Date;
			ride.Price = request.Price ?? ride.Price;
			ride.Date = request.Date ?? ride.Date;

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return ride;
		}
	}
}
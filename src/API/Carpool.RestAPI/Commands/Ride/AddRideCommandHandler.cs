using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideCommandHandler : IRequestHandler<AddRideCommand, Core.Models.Ride>
	{
		private readonly IRideRepository _repository;

		public AddRideCommandHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.Ride> Handle(AddRideCommand request, CancellationToken cancellationToken)
		{
			var ride = new Core.Models.Ride
			{
				OwnerId = request.OwnerId,
				GroupId = request.GroupId,
				Date = request.Date,
				Price = request.Price
			};

			await _repository.AddAsync(ride, cancellationToken).ConfigureAwait(false);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return ride;
		}
	}
}
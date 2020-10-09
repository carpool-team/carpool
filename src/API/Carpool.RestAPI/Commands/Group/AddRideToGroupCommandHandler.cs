using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddRideToGroupCommandHandler : AsyncRequestHandler<AddRideToGroupCommand>
	{
		private readonly IRideRepository _repository;

		public AddRideToGroupCommandHandler(IRideRepository repository)
			=> _repository = repository;


		protected override async Task Handle(AddRideToGroupCommand request, CancellationToken cancellationToken)
		{
			var ride = await _repository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			ride.GroupId = request.RideId;
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}
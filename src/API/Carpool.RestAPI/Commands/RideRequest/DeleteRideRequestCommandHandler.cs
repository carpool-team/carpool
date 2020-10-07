using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.RideRequest;
using MediatR;

namespace Carpool.RestAPI.Commands.RideRequest
{
	public class DeleteRideRequestCommandHandler : IRequestHandler<DeleteRideRequestCommand, Core.Models.RideRequest>
	{
		private readonly IRideRequestRepository _repository;

		public DeleteRideRequestCommandHandler(IRideRequestRepository repository)
		{
			_repository = repository;
		}

		public async Task<Core.Models.RideRequest> Handle(DeleteRideRequestCommand request,
		                                            CancellationToken cancellationToken)
		{
			var rideRequest = await _repository.GetByIdAsync(request.RideRequestId, cancellationToken).ConfigureAwait(false);
			_repository.Delete(rideRequest);
			return rideRequest;
		}
	}
}
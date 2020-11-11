using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Ride;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
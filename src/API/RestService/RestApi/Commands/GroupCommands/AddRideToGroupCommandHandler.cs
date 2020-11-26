using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Group;
using DataAccessLayer.Repositories.Ride;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
	public class AddRideToGroupCommandHandler : AsyncRequestHandler<AddRideToGroupCommand>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IRideRepository _rideRepository;

		public AddRideToGroupCommandHandler(IRideRepository repository, IGroupRepository groupRepository)
		{
			_rideRepository = repository;
			_groupRepository = groupRepository;
		}


		protected override async Task Handle(AddRideToGroupCommand request, CancellationToken cancellationToken)
		{
			if (!await _groupRepository.AnyWithId(request.GroupId).ConfigureAwait(false))
				throw new ApiProblemDetailsException($"Group with id: {request.GroupId} does not exist.",
					StatusCodes.Status404NotFound);

			var ride = await _rideRepository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			_ = ride
				?? throw new ApiProblemDetailsException($"Ride with id: {request.RideId} does not exist.",
					StatusCodes.Status404NotFound);

			ride.GroupId = request.GroupId;
			try
			{
				await _rideRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
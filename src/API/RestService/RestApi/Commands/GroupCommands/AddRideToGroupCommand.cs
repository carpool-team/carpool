using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class AddRideToGroupCommand : IRequest
	{
		[JsonConstructor]
		public AddRideToGroupCommand(RideId rideId, GroupId groupId)
		{
			RideId = rideId;
			GroupId = groupId;
		}

		public RideId RideId { get; }
		public GroupId GroupId { get; }
	}
	
	public class AddRideToGroupCommandHandler : AsyncRequestHandler<AddRideToGroupCommand>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IRideRepository _rideRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddRideToGroupCommandHandler(IRideRepository rideRepository, IGroupRepository groupRepository, IUnitOfWork unitOfWork)
		=> (_rideRepository, _groupRepository, _unitOfWork)
			= (rideRepository, groupRepository, unitOfWork);


		protected override async Task Handle(AddRideToGroupCommand request, CancellationToken cancellationToken)
		{
			if (!await _groupRepository.AnyWithIdAsync(request.GroupId, cancellationToken))
				throw new ApiProblemDetailsException($"Group with id: {request.GroupId} does not exist.",
					StatusCodes.Status404NotFound);

			var ride = await _rideRepository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			_ = ride
				?? throw new ApiProblemDetailsException($"Ride with id: {request.RideId} does not exist.",
					StatusCodes.Status404NotFound);

			ride.GroupId = request.GroupId;
			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
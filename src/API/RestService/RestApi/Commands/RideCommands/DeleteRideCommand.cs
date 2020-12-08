using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class DeleteRideCommand : IRequest<Ride>
	{
		[JsonConstructor]
		public DeleteRideCommand(RideId rideId)
			=> RideId = rideId;

		public RideId RideId { get; }
	}

	public class DeleteRideCommandHandler : IRequestHandler<DeleteRideCommand, Ride>
	{
		private readonly IRideRepository _rideRepository;
		private readonly IUnitOfWork _unitOfWork;

		public DeleteRideCommandHandler(IRideRepository rideRepository, IUnitOfWork unitOfWork)
			=> (_rideRepository, _unitOfWork)
				= (rideRepository, unitOfWork);

		public async Task<Ride> Handle(DeleteRideCommand request, CancellationToken cancellationToken)
		{
			var ride = await _rideRepository.GetByIdAsync(request.RideId, cancellationToken);

			_ = ride
				?? throw new ApiException($"Ride with id {request.RideId} does not exist",
					StatusCodes.Status404NotFound);

			_rideRepository.Delete(ride);

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return ride;
		}
	}
}
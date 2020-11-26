using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Ride;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.RideCommands.RemoveUserFromRide
{
    public class RemoveUserFromRideCommand : IRequest
    {
        public RemoveUserFromRideCommand(RideId rideId, UserId userId)
        {
            RideId = rideId;
            UserId = userId;
        }

        public RideId RideId { get; }
        public UserId UserId { get; }
    }

    public class RemoveUserFromRideCommandHandler : AsyncRequestHandler<RemoveUserFromRideCommand>
    {
        private readonly IRideRepository _rideRepository;

        public RemoveUserFromRideCommandHandler(IRideRepository rideRepository)
        {
            _rideRepository = rideRepository;
        }

        protected override async Task Handle(RemoveUserFromRideCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _rideRepository.RemoveUserFromRide(request.UserId, request.RideId, cancellationToken)
                    .ConfigureAwait(false);
                await _rideRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (DbUpdateException ex)
            {
                throw new ApiException(ex);
            }
        }
    }
}
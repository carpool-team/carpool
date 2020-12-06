using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.Entities.Intersections;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
    public class AddRideCommand : IRequest<Ride>
    {
        [JsonConstructor]
        public AddRideCommand(AppUserId ownerId,
            List<AppUserId> participantsIds,
            GroupId groupId,
            DateTime date,
            double price,
            Location destination,
            Location startingLocation)
            => (OwnerId, ParticipantsIds, GroupId, Date, Price, Destination, StartingLocation) =
                (ownerId, participantsIds, groupId, date, price, destination, startingLocation);

        public AppUserId OwnerId { get; }
        public List<AppUserId> ParticipantsIds { get; }
        public GroupId GroupId { get; }
        public DateTime Date { get; }
        public double Price { get; }
        public Location Destination { get; }
        public Location StartingLocation { get; }
    }

    public class AddRideCommandHandler : IRequestHandler<AddRideCommand, Ride>
    {
        private readonly IRideRepository _rideRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AddRideCommandHandler(IRideRepository rideRepository, IUnitOfWork unitOfWork)
        {
            _rideRepository = rideRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Ride> Handle(AddRideCommand request, CancellationToken cancellationToken)
        {
            var ride = new Ride
            {
                OwnerId = request.OwnerId,
                GroupId = request.GroupId,
                Date = request.Date,
                Price = request.Price,
                Destination = request.Destination
                              ?? throw new ApiProblemDetailsException("Ride must have a destination",
                                  StatusCodes.Status400BadRequest),
                StartingLocation = request.StartingLocation
                                   ?? throw new ApiProblemDetailsException("Ride must have a starting location",
                                       StatusCodes.Status400BadRequest)
            };

            await _rideRepository.AddAsync(ride, cancellationToken).ConfigureAwait(false);

            ride.Participants = request.ParticipantsIds.Select(x =>
            {
                AppUserId userId = new(x.Value);
                return new UserParticipatedRide(userId, ride.Id);
            }).ToList();

            try
            {
                await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (DbUpdateException ex)
            {
                throw new ApiException(ex);
            }

            return ride;
        }
    }
}
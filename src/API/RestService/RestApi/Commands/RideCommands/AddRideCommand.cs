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
using Domain.Enums;
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
            List<AppUserId>? participantsIds,
            GroupId groupId,
            DateTime date,
            double price,
            Location location,
            RideDirection rideDirection)
            => (OwnerId, ParticipantsIds, GroupId, Date, Price, Location, RideDirection) =
                (ownerId, participantsIds, groupId, date, price, location, rideDirection);

        public AppUserId OwnerId { get; }
        public List<AppUserId>? ParticipantsIds { get; }
        public GroupId GroupId { get; }
        public DateTime Date { get; }
        public double Price { get; }
        public Location Location { get; }
        public RideDirection RideDirection { get; }
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
                Location = request.Location
                              ?? throw new ApiProblemDetailsException("Ride must have a destination",
                                  StatusCodes.Status400BadRequest),
                RideDirection = request.RideDirection
            };

            await _rideRepository.AddAsync(ride, cancellationToken).ConfigureAwait(false);

            if(request.ParticipantsIds != null)
            {
                ride.Participants = request.ParticipantsIds.Select(x =>
                    {
                        AppUserId userId = new(x.Value);
                        return new UserParticipatedRide(userId, ride.Id);
                    })
                    .ToList();
            }

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
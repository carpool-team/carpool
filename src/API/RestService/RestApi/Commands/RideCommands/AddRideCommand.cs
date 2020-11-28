using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Ride;
using Domain.Entities;
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
		public AddRideCommand(UserId ownerId,
			List<UserId> participantsIds,
			GroupId groupId,
			DateTime date,
			double price,
			Location destination,
			Location startingLocation)
			=> (OwnerId, ParticipantsIds, GroupId, Date, Price, Destination, StartingLocation) =
				(ownerId, participantsIds, groupId, date, price, destination, startingLocation);

		public UserId OwnerId { get; }
		public List<UserId> ParticipantsIds { get; }
		public GroupId GroupId { get; }
		public DateTime Date { get; }
		public double Price { get; }
		public Location Destination { get; }
		public Location StartingLocation { get; }
	}

	public class AddRideCommandHandler : IRequestHandler<AddRideCommand, Ride>
	{
		private readonly IRideRepository _rideRepository;

		public AddRideCommandHandler(IRideRepository rideRepository)
			=> _rideRepository = rideRepository;

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
			try
			{
				await _rideRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return ride;
		}
	}
}
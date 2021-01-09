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
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using RestApi.DTOs.Stop;

namespace RestApi.Commands.RideCommands
{
	public class AddRideCommand : IRequest<Ride>
	{
		[JsonConstructor]
		public AddRideCommand(AppUserId ownerId,
			GroupId groupId,
			DateTime date,
			double price,
			Location location,
			RideDirection rideDirection,
			List<AddStopDto>? stops,
			byte seatsLimit)
			=> (OwnerId, GroupId, Date, Price, Location, RideDirection, Stops, SeatsLimit)
				= (ownerId, groupId, date, price, location, rideDirection, stops, seatsLimit);

		public AppUserId OwnerId { get; }
		public GroupId GroupId { get; }
		public DateTime Date { get; }
		public double Price { get; }
		public Location Location { get; }
		public RideDirection RideDirection { get; }
		public List<AddStopDto>? Stops { get; }
		public byte SeatsLimit { get; }
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
			IdGenerator rideIdGenerator = new(IdGeneratorType.Ride);
			var rideId = rideIdGenerator.CreateId();
			
			var ride = new Ride(new RideId(rideId),
				request.OwnerId,
				request.GroupId,
				request.Date,
				request.Price,
				request.Location
				?? throw new ApiProblemDetailsException("Ride must have a destination",
					StatusCodes.Status400BadRequest),
				request.RideDirection,
				request.Stops?.Select(x => new Stop(x.ParticipantId,
					       new Location(x.Location.Longitude, x.Location.Latitude),
					       new RideId(rideId)))
				       .ToList() ?? new List<Stop>(),
				request.SeatsLimit,
				new List<RideRequest>());

			await _rideRepository.AddAsync(ride, cancellationToken).ConfigureAwait(false);

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (SqlException ex)
			{
				throw new ApiException(ex);
			}

			return ride;
		}
	}
}
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects;
using DataTransferObjects.Group;
using DataTransferObjects.Ride;
using DataTransferObjects.Stop;
using DataTransferObjects.User;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;

namespace Application.Queries.RideQueries
{
	public class GetUserOwnedRidesQuery : IRequest<IEnumerable<RideDto>>
	{
		public GetUserOwnedRidesQuery(AppUserId appUserId, bool past)
		{
			AppUserId = appUserId;
			Past = past;
		}

		public AppUserId AppUserId { get; }
		public bool Past { get; }
	}

	public class GetUserOwnedRidesQueryHandler
		: IRequestHandler<GetUserOwnedRidesQuery, IEnumerable<RideDto>>
	{
		private readonly IRideRepository _repository;

		public GetUserOwnedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<RideDto>> Handle(GetUserOwnedRidesQuery request,
			CancellationToken cancellationToken)
		{
			try
			{
				var rides = await _repository
					.GetOwnedRidesByUserIdAsNoTrackingAsync(request.AppUserId, request.Past, cancellationToken)
					.ConfigureAwait(false);
				List<RideDto> rideDtos = new();
				foreach (var ride in rides)
				{
					var owner = ride.Owner;
					RideOwnerDto rideOwnerDto = new(owner.Rating, owner.FirstName, owner.LastName, owner.Id);

					var group = ride.Group;
					GroupDto groupDto = new(group.UserGroups.Count,
						group.Id,
						new LocationDto(group.Location.Longitude, group.Location.Latitude),
						group.OwnerId,
						group.Name);

					List<StopDto> stopDtos =
						ride.Stops.Select(x => new StopDto(new LocationDto(x.Location.Longitude, x.Location.Latitude),
							    new ParticipantDto(x.Participant.Id, x.Participant.FirstName, x.Participant.LastName)))
							.ToList();
					rideDtos.Add(new RideDto(rideOwnerDto,
						groupDto,
						new LocationDto(ride.Location.Longitude, ride.Location.Latitude),
						ride.Price,
						ride.RideDirection,
						stopDtos, 
						ride.Date,
						ride.Id,
						ride.SeatsLimit,
						ride.RecurringRideId));
				}

				return rideDtos;
			}
			catch (Exception ex)
			{
				throw new ApiException(ex.InnerException);
			}
		}
	}
}
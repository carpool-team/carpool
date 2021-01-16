﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects;
using DataTransferObjects.Group;
using DataTransferObjects.Ride;
using DataTransferObjects.RideRequest;
using DataTransferObjects.Stop;
using DataTransferObjects.User;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using Mapster;
using MediatR;

namespace RestApi.Queries.RideRequestQueries
{
	public class GetParticipantRideRequestsQuery : IRequest<IEnumerable<RideRequestDto>>
	{
		public GetParticipantRideRequestsQuery(AppUserId tokenUserId)
			=> TokenUserId = tokenUserId;

		public AppUserId TokenUserId { get; }
	}

	public class GetParticipantRideRequestsQueryHandler : IRequestHandler<GetParticipantRideRequestsQuery, IEnumerable<RideRequestDto>>
	{
		private readonly IRideRequestRepository _rideRequestRepository;

		public GetParticipantRideRequestsQueryHandler(IRideRequestRepository rideRequestRepository)
			=> _rideRequestRepository = rideRequestRepository;

		public async Task<IEnumerable<RideRequestDto>> Handle(GetParticipantRideRequestsQuery request,
			CancellationToken cancellationToken)
		{
			var rideRequests = await _rideRequestRepository.GetParticipantPendingRideRequestAsNoTrackingAsync(
				request.TokenUserId,
				cancellationToken);

			var rideRequestDtos = rideRequests.Select(x
					=> new RideRequestDto(x.Id,
						new RideRequestRideDto(x.RideId,
							x.Ride.Date,
							new LocationDto(x.Ride.Location.Longitude, x.Ride.Location.Latitude),
							new MinimalGroupDto(x.Ride.GroupId,
								new LocationDto(x.Ride.Group.Location.Longitude, x.Ride.Group.Location.Latitude),
								x.Ride.Group.Name),
							x.Ride.RideDirection,
							x.Ride.Stops.Select(a => a.Adapt<StopDto>()).ToList()),
						new RideOwnerDto(x.Ride.Owner.Rating,
							x.RideOwner.FirstName,
							x.RideOwner.LastName,
							x.RideOwner.Id),
						new RideRequestingUserDto(x.RequestingUser.Id,
							x.RequestingUser.FirstName,
							x.RequestingUser.LastName),
						x.IsAccepted,
						x.IsPending))
				.ToList();

			return rideRequestDtos;
		}
	}
}
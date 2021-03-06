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

namespace Application.Queries.RideRequestQueries
{
	public class GetOwnerRideRequestsQuery : IRequest<IEnumerable<RideRequestDto>>
	{
		public GetOwnerRideRequestsQuery(AppUserId tokenUserId) 
			=> TokenUserId = tokenUserId;
		
		public AppUserId TokenUserId { get; }
	}
	
	public class GetOwnerRideRequestsQueryHandler : IRequestHandler<GetOwnerRideRequestsQuery, IEnumerable<RideRequestDto>>
	{
		private readonly IRideRequestRepository _rideRequestRepository;
		
		public GetOwnerRideRequestsQueryHandler(IRideRequestRepository rideRequestRepository) 
			=> _rideRequestRepository = rideRequestRepository;

		public async Task<IEnumerable<RideRequestDto>> Handle(GetOwnerRideRequestsQuery request,
			CancellationToken cancellationToken)
		{
			var rideRequests = await _rideRequestRepository.GetOwnerPendingRideRequestAsNoTrackingAsync(
				request.TokenUserId,
				cancellationToken);

			var rideRequestDtos = rideRequests.Select(x
				=> new RideRequestDto(x.Id,
					new RideRequestRideDto(x.RideId,
						x.Ride.Date,
						x.Ride.Location.Adapt<LocationDto>(),
						new MinimalGroupDto(x.Ride.GroupId,
							x.Ride.Group.Location.Adapt<LocationDto>(),
								x.Ride.Group.Name),
							x.Ride.RideDirection,
							x.Ride.Stops.Select(a => a.Adapt<StopDto>()).ToList()),
						new RideOwnerDto(x.RideOwner.Rating,
							x.RideOwner.FirstName,
							x.RideOwner.LastName,
							x.RideOwner.Id),
						new RideRequestingUserDto(x.RequestingUser.Id,
							x.RequestingUser.FirstName,
							x.RequestingUser.LastName,
							x.Location.Adapt<LocationDto>()),
						x.IsAccepted,
						x.IsPending))
				.ToList();

			return rideRequestDtos;
		}
	}
}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects.RideRequest;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Queries.RideRequestQueries
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
			var rideRequests = await _rideRequestRepository.GetUserPendingRideRequestAsNoTrackingAsync(
				request.TokenUserId,
				cancellationToken);

			var rideRequestDtos = rideRequests.Select(x
					=> new RideRequestDto(new RideRequestRideDto(x.RideId,
							x.Ride.Date,
							new LocationDto(x.Ride.Location.Longitude, x.Ride.Location.Latitude),
							new MinimalGroupDto(x.Ride.GroupId,
								new LocationDto(x.Ride.Location.Longitude, x.Ride.Location.Latitude),
								x.Ride.Group.Name),
							x.Ride.RideDirection),
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
		}
	}
}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.Enums;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace RestApi.Queries.RideQueries
{
	public class GetRidesQuery : IRequest<IEnumerable<Ride>>
	{
		public GetRidesQuery(GroupId groupId,
			RideDirection rideDirection,
			DateTime dateTime,
			AppUserId tokenUserId)
		{
			GroupId = groupId;
			RideDirection = rideDirection;
			DateTime = dateTime;
			TokenUserId = tokenUserId;
		}

		public GroupId GroupId { get; }
		public RideDirection RideDirection { get; }
		public DateTime DateTime { get; }

		public AppUserId TokenUserId { get; }
	}

	public class GetRidesQueryHandler : IRequestHandler<GetRidesQuery, IEnumerable<Ride>>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IRideRepository _rideRepository;

		public GetRidesQueryHandler(IRideRepository repository, IGroupRepository groupRepository)
		{
			_rideRepository = repository;
			_groupRepository = groupRepository;
		}

		public async Task<IEnumerable<Ride>> Handle(GetRidesQuery request,
			CancellationToken cancellationToken)
		{
			var isUserInGroup = await _groupRepository.DoesUserExistsInGroup(request.GroupId,
				request.TokenUserId,
				cancellationToken);

			if (!isUserInGroup)
				throw new ApiException("User does not have access to this group rides", StatusCodes.Status403Forbidden);

			var rides = await _rideRepository.GetPartAsNoTrackingAsync(request.GroupId,
					request.RideDirection,
					request.DateTime,
					cancellationToken);
			
			return rides;
		}
	}
}
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using RestApi.DTOs.Ride;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupRidesQuery : IRequest<HashSet<RideDto>>
	{
		public GetGroupRidesQuery(GroupId groupId, AppUserId requestingUserId)
		{
			GroupId = groupId;
			RequestingUserId = requestingUserId;
		}

		public GroupId GroupId { get; }
		public AppUserId RequestingUserId { get; }
	}
	
	public class GetGroupRidesQueryHandler : IRequestHandler<GetGroupRidesQuery, HashSet<RideDto>>
	{
		private readonly IGroupRepository _groupRepository;

		public GetGroupRidesQueryHandler(IGroupRepository groupRepository)
			=> _groupRepository = groupRepository;

		public async Task<HashSet<RideDto>> Handle(GetGroupRidesQuery request, CancellationToken cancellationToken)
		{
			var doesUserExistsInGroup =  await _groupRepository.DoesUserExistsInGroup(request.GroupId, request.RequestingUserId, cancellationToken: cancellationToken);

			if (!doesUserExistsInGroup)
				throw new ApiException(StatusCodes.Status403Forbidden);
			
			var rides = await _groupRepository.GetGroupRides(request.GroupId, cancellationToken);

			var rideDtos = rides.Select(x => new RideDto(x.Owner.Adapt<RideOwnerDto>(),
				x.Group.Adapt<GroupDto>(),
				x.Location.Adapt<LocationDto>(),
				x.Price,
				x.RideDirection,
				x.Stops.Select(a => a.Adapt<StopDto>()).ToList(),
				x.Date,
				x.Id,
				x.SeatsLimit,
				x.RecurringRideId)).ToHashSet();
			
			return rideDtos;
		}
	}
}
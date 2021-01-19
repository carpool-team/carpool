using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects.Group;
using DataTransferObjects.GroupReport;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupReportQuery : IRequest<GroupReportDto>
	{
		public GetGroupReportQuery(GroupId groupId,
			AppUserId requestingUserId,
			DateTimeOffset startDateTime,
			DateTimeOffset endDateTime)
		{
			GroupId = groupId;
			RequestingUserId = requestingUserId;
			StartDateTime = startDateTime;
			EndDateTime = endDateTime;
		}

		public GroupId GroupId { get; }
		public AppUserId RequestingUserId { get; }
		public DateTimeOffset StartDateTime { get; }
		public DateTimeOffset EndDateTime { get; }
	}
	
	public class GetGroupReportQueryHandler : IRequestHandler<GetGroupReportQuery, GroupReportDto>
	{
		private const int TOP_TAKE_COUNT = 10;
		
		private readonly IGroupRepository _groupRepository;

		public GetGroupReportQueryHandler(IGroupRepository groupRepository)
			=> _groupRepository = groupRepository;

		public async Task<GroupReportDto> Handle(GetGroupReportQuery request, CancellationToken cancellationToken)
		{
			if (request.EndDateTime > DateTimeOffset.Now.AddDays(-1))
				throw new ApiException(StatusCodes.Status406NotAcceptable);
			
			var doesUserExistsInGroup = await _groupRepository.DoesUserExistsInGroup(request.GroupId,
				request.RequestingUserId,
				cancellationToken);

			if (!doesUserExistsInGroup)
				throw new ApiException(StatusCodes.Status403Forbidden);
			
			var group = await _groupRepository.GetByIdAsNoTrackingAsync(request.GroupId, cancellationToken);
			var rides = group.Rides.Where(x => x.Date >= request.StartDateTime 
			                                   && x.Date <= request.EndDateTime).ToList();
			
			var groupedRidesCountByDriver = rides
				.GroupBy(x => x.OwnerId)
				.Select(x => new
				{
					DriverId = x.Key, 
					RideCount = x.Count()
				})
				.OrderBy(x => x.RideCount)
				.Take(TOP_TAKE_COUNT)
				.ToList();

			var topDrivers = (from grouping in groupedRidesCountByDriver
			                  let user = @group.UserGroups.Select(x => x.ApplicationUser)
				                  .SingleOrDefault(x => x.Id == grouping.DriverId)
			                  select new UserReportDto(grouping.RideCount,
				                  user.Id, 
				                  user.FirstName,
				                  user.LastName)).ToList();

			var participatedRidesCountByPassenger = rides.SelectMany(x => x.Stops)
				.GroupBy(x => x.ParticipantId)
				.Select(x => new
				{
					PassengerId = x.Key,
					RideCount = x.Count()
				}).ToList();
			
			var topPassengers = (from grouping in participatedRidesCountByPassenger
			                     let user = @group.UserGroups.Select(x => x.ApplicationUser)
				                     .SingleOrDefault(x => x.Id == grouping.PassengerId)
			                     select new UserReportDto(grouping.RideCount,
				                     user.Id, 
				                     user.FirstName,
				                     user.LastName)).Take(TOP_TAKE_COUNT).ToList();

			var passengerCount = participatedRidesCountByPassenger.Sum(x => x.RideCount);
			
			GroupReportDto groupReportDto = new(topDrivers,
				topPassengers,
				group.Adapt<GroupDto>(),
				rides.Count,
				passengerCount);

			return groupReportDto;
		}
	}
}
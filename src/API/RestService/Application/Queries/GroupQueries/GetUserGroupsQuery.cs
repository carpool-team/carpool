using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects.Group;
using DataTransferObjects.Ride;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace Application.Queries.GroupQueries
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<GroupDetailsDto>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(AppUserId appUserId)
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; }
	}
	
	public class GetUserGroupsQueryHandler : IRequestHandler<GetUserGroupsQuery, IEnumerable<GroupDetailsDto>>
	{
		private readonly IGroupRepository _repository;

		public GetUserGroupsQueryHandler(IGroupRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<GroupDetailsDto>> Handle(GetUserGroupsQuery request,
			CancellationToken cancellationToken)
		{
			var userGroups = await _repository.GetGroupsByUserIdAsNoTrackingAsync(request.AppUserId, cancellationToken)
				.ConfigureAwait(false);

			var userGroupDtos = userGroups.Select(group => new GroupDetailsDto(group.Id,
				group.Location,
				group.Rides.Select(x => new RideMinimalDto(x.Id, x.Date, x.Location)).ToList(),
				group.Name,
				group.Code,
				group.Owner,
				group.UserGroups.Count,
				group.Rides.Count)).ToList();
			
			return userGroupDtos;
		}
	}
}
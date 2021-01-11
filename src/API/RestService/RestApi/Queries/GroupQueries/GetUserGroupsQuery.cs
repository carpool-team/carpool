using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects;
using DataTransferObjects.Group;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupQueries
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<IndexGroupDto>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(AppUserId appUserId)
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; }
	}
	
	public class GetUserGroupsQueryHandler : IRequestHandler<GetUserGroupsQuery, IEnumerable<IndexGroupDto>>
	{
		private readonly IGroupRepository _repository;

		public GetUserGroupsQueryHandler(IGroupRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<IndexGroupDto>> Handle(GetUserGroupsQuery request,
			CancellationToken cancellationToken)
		{
			var userGroups = await _repository.GetGroupsByUserIdAsNoTrackingAsync(request.AppUserId, cancellationToken)
				.ConfigureAwait(false);

			var userGroupDtos = userGroups.Select(x => new IndexGroupDto(x.UserGroups.Count,
				x.Id,
				new LocationDto(x.Location.Longitude, x.Location.Latitude),
				x.Name,
				x.Rides.Count)).ToList();
			
			return userGroupDtos;
		}
	}
}
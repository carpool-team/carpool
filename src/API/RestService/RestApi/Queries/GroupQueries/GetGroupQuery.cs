using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects.GroupDtos;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RestApi.DTOs.Ride;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupQuery : IRequest<GroupDetailsDto>
	{
		[JsonConstructor]
		public GetGroupQuery(GroupId id, AppUserId appUserId)
		{
			Id = id;
			AppUserId = appUserId;
		}

		public GroupId Id { get; set; }
		public AppUserId AppUserId { get; set; }
	}
	
	public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, GroupDetailsDto>
	{
		private readonly IGroupRepository _repository;

		public GetGroupQueryHandler(IGroupRepository repository) => _repository = repository;


		public async Task<GroupDetailsDto> Handle(GetGroupQuery request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);

			if (group.OwnerId != request.AppUserId || group.UserGroups.All(x => x.AppUserId != request.AppUserId))
				throw new ApiException("User does not have access to view this group", StatusCodes.Status403Forbidden);
			
			var groupDto = new GroupDetailsDto(group.Id,
				group.Location,
				group.Rides.Select(x => new RideMinimalDto(x.Id, x.Date, x.Location)).ToList(),
				group.Name,
				group.Code,
				group.Owner,
				group.UserGroups.Count,
				group.Rides.Count);

			return groupDto;
		}
	}
}
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects.GroupDtos;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;
using RestApi.DTOs.Ride;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupQuery : IRequest<GroupDetailsDto>
	{
		[JsonConstructor]
		public GetGroupQuery(GroupId id)
			=> Id = id;

		public GroupId Id { get; set; }
	}
	
	public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, GroupDetailsDto>
	{
		private readonly IGroupRepository _repository;

		public GetGroupQueryHandler(IGroupRepository repository) => _repository = repository;


		public async Task<GroupDetailsDto> Handle(GetGroupQuery request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);

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
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Group;
using MediatR;
using RestApi.DTOs.Group;
using RestApi.DTOs.Ride;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, GroupDetailsDto>
	{
		private readonly IGroupRepository _repository;

		public GetGroupQueryHandler(IGroupRepository repository) => _repository = repository;


		public async Task<GroupDetailsDto> Handle(GetGroupQuery request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);

			var groupDto = new GroupDetailsDto(group.Id,
				group.Location,
				group.Rides.Select(x => new RideMinimalDto(x.Id, x.Date, x.Destination)).ToList(),
				group.Name,
				group.Code,
				group.Owner,
				group.UserGroups.Count,
				group.Rides.Count);

			return groupDto;
		}
	}
}
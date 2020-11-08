using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.DTOs.GroupDTOs;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupsQueryHandler : IRequestHandler<GetGroupsQuery, IEnumerable<IndexGroupDTO>>
	{
		private readonly IGroupRepository _repository;

		public GetGroupsQueryHandler(IGroupRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<IndexGroupDTO>> Handle(GetGroupsQuery request,
		                                                     CancellationToken cancellationToken)
		{
			var groups = await _repository.GetRangeAsNoTrackingAsync(request.Count, request.Page).ConfigureAwait(false);
			var groupDtos = groups.Select(x
				=> new IndexGroupDTO(x.Id, x.Location, x.Name, x.Rides.Count, x.UserGroups.Count));

			return groupDtos;
		}
	}
}
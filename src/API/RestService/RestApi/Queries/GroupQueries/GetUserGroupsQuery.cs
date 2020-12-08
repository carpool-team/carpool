using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupQueries
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<Group>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(AppUserId appUserId)
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; }
	}
	
	public class GetUserGroupsQueryHandler : IRequestHandler<GetUserGroupsQuery, IEnumerable<Group>>
	{
		private readonly IGroupRepository _repository;

		public GetUserGroupsQueryHandler(IGroupRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Group>> Handle(GetUserGroupsQuery request,
			CancellationToken cancellationToken)
		{
			var userGroups = await _repository.GetGroupsByUserIdAsNoTrackingAsync(request.AppUserId, cancellationToken)
				.ConfigureAwait(false);

			return userGroups;
		}
	}
}
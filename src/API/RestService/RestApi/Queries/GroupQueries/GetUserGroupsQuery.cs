using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Group;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupQueries
{
	public class GetUserGroupsQuery : IRequest<IEnumerable<Group>>
	{
		[JsonConstructor]
		public GetUserGroupsQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; }
	}
	
	public class GetUserGroupsQueryHandler : IRequestHandler<GetUserGroupsQuery, IEnumerable<Group>>
	{
		private readonly IGroupRepository _repository;

		public GetUserGroupsQueryHandler(IGroupRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Group>> Handle(GetUserGroupsQuery request,
			CancellationToken cancellationToken)
		{
			var userGroups = await _repository.GetGroupsByUserIdAsNoTrackingAsync(request.UserId, cancellationToken)
				.ConfigureAwait(false);

			return userGroups;
		}
	}
}
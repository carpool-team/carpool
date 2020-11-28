using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetGroupInviteQuery : IRequest<GroupInvite>
	{
		public GetGroupInviteQuery(GroupInviteId groupInviteId)
			=> GroupInviteId = groupInviteId;

		public GroupInviteId GroupInviteId { get; }
	}
	
	public class GetGroupInviteQueryHandler : IRequestHandler<GetGroupInviteQuery, GroupInvite>
	{
		private readonly IGroupInviteRepository _repository;

		public GetGroupInviteQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<GroupInvite> Handle(GetGroupInviteQuery request,
			CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsNoTrackingAsync(request.GroupInviteId, cancellationToken)
				.ConfigureAwait(false);

			if (groupInvite is null)
				throw new NullReferenceException();

			return groupInvite;
		}
	}
}
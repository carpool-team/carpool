using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.GroupInviteQueries
{
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
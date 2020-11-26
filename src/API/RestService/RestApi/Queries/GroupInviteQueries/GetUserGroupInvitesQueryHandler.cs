using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.GroupInviteQueries
{
	public class
		GetUserGroupInvitesQueryHandler : IRequestHandler<GetUserGroupInvitesQuery,
			IEnumerable<GroupInvite>
		>
	{
		private readonly IGroupInviteRepository _repository;

		public GetUserGroupInvitesQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<GroupInvite>> Handle(GetUserGroupInvitesQuery request,
			CancellationToken cancellationToken)
			=> await _repository.GetUserGroupInvitesByUserIdAsNoTrackingAsync(request.UserId, cancellationToken)
				.ConfigureAwait(false);
	}
}
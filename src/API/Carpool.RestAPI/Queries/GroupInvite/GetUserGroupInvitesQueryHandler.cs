using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.GroupInvite;
using MediatR;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class
		GetUserGroupInvitesQueryHandler : IRequestHandler<GetUserGroupInvitesQuery, IEnumerable<Core.Models.GroupInvite>
		>
	{
		private readonly IGroupInviteRepository _repository;

		public GetUserGroupInvitesQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Core.Models.GroupInvite>> Handle(GetUserGroupInvitesQuery request,
		                                                               CancellationToken cancellationToken)
			=> await _repository.GetUserGroupInvitesByUserIdAsNoTrackingAsync(request.UserId, cancellationToken)
			                    .ConfigureAwait(false);
	}
}
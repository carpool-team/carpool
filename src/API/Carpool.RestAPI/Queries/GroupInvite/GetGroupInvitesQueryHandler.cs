using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.GroupInvite;
using MediatR;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class
		GetGroupInvitesQueryHandler : IRequestHandler<GetGroupInvitesQuery, IEnumerable<Core.Models.GroupInvite>>
	{
		private readonly IGroupInviteRepository _repository;

		public GetGroupInvitesQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<Core.Models.GroupInvite>> Handle(GetGroupInvitesQuery request,
		                                                               CancellationToken cancellationToken)
			=> await _repository.GetPartAsync(cancellationToken).ConfigureAwait(false);
	}
}
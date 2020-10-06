using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.GroupInvite;
using MediatR;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class GetGroupInviteQueryHandler : IRequestHandler<GetGroupInviteQuery, Core.Models.GroupInvite>
	{
		private readonly IGroupInviteRepository _repository;

		public GetGroupInviteQueryHandler(IGroupInviteRepository repository)
		{
			_repository = repository;
		}

		public async Task<Core.Models.GroupInvite> Handle(GetGroupInviteQuery request, CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsNoTrackingAsync(request.GroupInviteId, cancellationToken).ConfigureAwait(false);
			if(groupInvite is null)
				throw new NullReferenceException();

			return groupInvite;
		}
	}
}
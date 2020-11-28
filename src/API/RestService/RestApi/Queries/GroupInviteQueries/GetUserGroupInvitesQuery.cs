using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetUserGroupInvitesQuery : IRequest<IEnumerable<GroupInvite>>
	{
		[JsonConstructor]
		public GetUserGroupInvitesQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; set; }
	}
	
	public class GetUserGroupInvitesQueryHandler 
		: IRequestHandler<GetUserGroupInvitesQuery, IEnumerable<GroupInvite>
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
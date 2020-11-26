using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories.GroupInvite
{
	public interface IGroupInviteRepository : IBaseRepository<Domain.Entities.GroupInvite, GroupInviteId>
	{
		Task<Domain.Entities.GroupInvite> GetByIdAsync(GroupInviteId id, CancellationToken cancellationToken);
		Task<Domain.Entities.GroupInvite> GetByIdAsNoTrackingAsync(GroupInviteId id, CancellationToken cancellationToken);

		Domain.Entities.GroupInvite GetById(GroupInviteId id);
		Domain.Entities.GroupInvite GetByIdAsNoTracking(GroupInviteId id);

		Task<List<Domain.Entities.GroupInvite>> GetPartAsync(CancellationToken cancellationToken);

		Task<List<Domain.Entities.GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(UserId userId,
		                                                                     CancellationToken cancellationToken);
	}
}
using Domain.Entities;
using IdentifiersShared.Identifiers;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Domain.Contracts.Repositories
{
	public interface IGroupInviteRepository
	{
		Task<GroupInvite> GetByIdAsync(GroupInviteId id, CancellationToken cancellationToken);

		Task<GroupInvite> GetByIdAsNoTrackingAsync(GroupInviteId id,
			CancellationToken cancellationToken);

		Task<List<GroupInvite>> GetPartAsync(CancellationToken cancellationToken);

		Task<List<GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken);

		Task AddAsync(GroupInvite groupInvite, CancellationToken cancellationToken);

		void Delete(GroupInvite groupInvite);
	}
}
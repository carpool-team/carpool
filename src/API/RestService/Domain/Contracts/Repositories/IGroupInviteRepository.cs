using Domain.Entities;
using IdentifiersShared.Identifiers;
using System.Collections.Generic;
using System.Linq;
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

		IQueryable<GroupInvite> GetUserGroupInvitesByUserIdAsNoTrackingAsync(AppUserId appUserId);

		Task AddAsync(GroupInvite groupInvite, CancellationToken cancellationToken);

		void Delete(GroupInvite groupInvite);
	}
}
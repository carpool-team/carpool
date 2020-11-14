using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.GroupInvite
{
	public interface IGroupInviteRepository : IBaseRepository<Core.Models.GroupInvite, Guid>
	{
		Task<Core.Models.GroupInvite> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Core.Models.GroupInvite> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Core.Models.GroupInvite GetById(Guid id);
		Core.Models.GroupInvite GetByIdAsNoTracking(Guid id);

		Task<List<Core.Models.GroupInvite>> GetPartAsync(CancellationToken cancellationToken);

		Task<List<Core.Models.GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(Guid userId,
			CancellationToken cancellationToken);
	}
}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.GroupInvite
{
	public interface IGroupInviteRepository : IBaseRepository<Domain.Entities.GroupInvite, Guid>
	{
		Task<Domain.Entities.GroupInvite> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Domain.Entities.GroupInvite> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Domain.Entities.GroupInvite GetById(Guid id);
		Domain.Entities.GroupInvite GetByIdAsNoTracking(Guid id);

		Task<List<Domain.Entities.GroupInvite>> GetPartAsync(CancellationToken cancellationToken);

		Task<List<Domain.Entities.GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(Guid userId,
		                                                                     CancellationToken cancellationToken);
	}
}
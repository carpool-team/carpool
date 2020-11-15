using Carpool.Core.ValueObjects;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.User
{
	public interface IUserRepository : IBaseRepository<Core.Models.ApplicationUser, Guid>
	{
		Task<List<Core.Models.ApplicationUser>> GetGroupUsersByGroupIdAsync(Guid id);

		Task<Core.Models.ApplicationUser> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Task<Core.Models.ApplicationUser> GetByIdAsync(Guid id, CancellationToken cancellationToken);

		Task<List<Core.Models.ApplicationUser>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<bool> ExistsWithId(Guid id, CancellationToken cancellationToken);
		Task<double> GetUserRatingAsync(Guid userId, CancellationToken cancellationToken);
	}
}
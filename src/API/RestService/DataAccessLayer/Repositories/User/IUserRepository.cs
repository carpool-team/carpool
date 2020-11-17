using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;

namespace DataAccessLayer.Repositories.User
{
	public interface IUserRepository : IBaseRepository<ApplicationUser, Guid>
	{
		Task<List<ApplicationUser>> GetGroupUsersByGroupIdAsync(Guid id);

		Task<ApplicationUser> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Task<ApplicationUser> GetByIdAsync(Guid id, CancellationToken cancellationToken);

		Task<List<ApplicationUser>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<bool> ExistsWithId(Guid id, CancellationToken cancellationToken);
		Task<double> GetUserRatingAsync(Guid userId, CancellationToken cancellationToken);
	}
}
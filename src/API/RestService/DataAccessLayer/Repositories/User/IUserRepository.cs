using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories.User
{
	public interface IUserRepository : IBaseRepository<ApplicationUser, AppUserId>
	{
		Task<List<ApplicationUser>> GetGroupUsersByGroupIdAsync(GroupId id);

		Task<ApplicationUser> GetByIdAsNoTrackingAsync(AppUserId id, CancellationToken cancellationToken);

		Task<ApplicationUser> GetByIdAsync(AppUserId id, CancellationToken cancellationToken);

		Task<List<ApplicationUser>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<bool> ExistsWithId(AppUserId id, CancellationToken cancellationToken);
		Task<double> GetUserRatingAsync(AppUserId appUserId, CancellationToken cancellationToken);
	}
}
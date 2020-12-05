using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IUserRepository
	{
		Task<List<ApplicationUser>> GetGroupUsersByGroupIdAsync(GroupId id);

		Task<ApplicationUser> GetByIdAsNoTrackingAsync(AppUserId id, CancellationToken cancellationToken);

		Task<ApplicationUser> GetByIdAsync(AppUserId id, CancellationToken cancellationToken);

		Task<List<ApplicationUser>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<bool> ExistsWithId(AppUserId id, CancellationToken cancellationToken);

		Task<double> GetUserRatingAsync(AppUserId appUserId, CancellationToken cancellationToken);

		Task AddAsync(ApplicationUser applicationUser, CancellationToken cancellationToken);

		void Delete(ApplicationUser applicationUser);
	}
}
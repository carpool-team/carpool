using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories.User
{
	public interface IUserRepository : IBaseRepository<ApplicationUser, UserId>
	{
		Task<List<ApplicationUser>> GetGroupUsersByGroupIdAsync(GroupId id);

		Task<ApplicationUser> GetByIdAsNoTrackingAsync(UserId id, CancellationToken cancellationToken);

		Task<ApplicationUser> GetByIdAsync(UserId id, CancellationToken cancellationToken);

		Task<List<ApplicationUser>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<bool> ExistsWithId(UserId id, CancellationToken cancellationToken);
		Task<double> GetUserRatingAsync(UserId userId, CancellationToken cancellationToken);
	}
}
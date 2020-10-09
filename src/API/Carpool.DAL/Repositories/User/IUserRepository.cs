using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.User
{
	public interface IUserRepository : IBaseRepository<Core.Models.User, Guid>
	{
		IAsyncEnumerable<Core.Models.User> GetGroupUsersByGroupIdAsync(Guid id);

		Task<Core.Models.User> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Task<Core.Models.User> GetByIdAsync(Guid id, CancellationToken cancellationToken);

		Task<List<Core.Models.User>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);
	}
}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Models.Intersections;

namespace Carpool.DAL.Repositories.Group
{
	public interface IGroupRepository : IBaseRepository<Core.Models.Group, Guid>
	{
		Task<Core.Models.Group> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Core.Models.Group> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Core.Models.Group GetById(Guid id);
		Core.Models.Group GetByIdAsNoTracking(Guid id);

		Task<bool> GroupCodeExists(string code);

		Task<IEnumerable<Core.Models.Group>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip);

		Task<List<Core.Models.Group>> GetGroupsByUserIdAsNoTrackingAsync(Guid userId,
		                                                                 CancellationToken cancellationToken = default);

		Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default);
	}
}
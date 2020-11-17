using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities.Intersections;

namespace DataAccessLayer.Repositories.Group
{
	public interface IGroupRepository : IBaseRepository<Domain.Entities.Group, Guid>
	{
		Task<Domain.Entities.Group> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Domain.Entities.Group> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Domain.Entities.Group GetById(Guid id);
		Domain.Entities.Group GetByIdAsNoTracking(Guid id);

		Task<bool> GroupCodeExists(string code);

		Task<IEnumerable<Domain.Entities.Group>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip);

		Task<List<Domain.Entities.Group>> GetGroupsByUserIdAsNoTrackingAsync(Guid userId,
		                                                                     CancellationToken cancellationToken =
			                                                                     default);

		Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default);
	}
}
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories.Group
{
	public interface IGroupRepository : IBaseRepository<Domain.Entities.Group, GroupId>
	{
		Task<Domain.Entities.Group> GetByIdAsync(GroupId id, CancellationToken cancellationToken);
		Task<Domain.Entities.Group> GetByIdAsNoTrackingAsync(GroupId id, CancellationToken cancellationToken);

		Domain.Entities.Group GetById(GroupId id);
		Domain.Entities.Group GetByIdAsNoTracking(GroupId id);

		Task<bool> GroupCodeExists(string code);

		Task<IEnumerable<Domain.Entities.Group>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip);

		Task<List<Domain.Entities.Group>> GetGroupsByUserIdAsNoTrackingAsync(UserId userId,
			CancellationToken cancellationToken =
				default);

		Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default);
	}
}
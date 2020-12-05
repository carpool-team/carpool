using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IGroupRepository
	{
		Task<Domain.Entities.Group> GetByIdAsync(GroupId id, CancellationToken cancellationToken);
		Task<Domain.Entities.Group> GetByIdAsNoTrackingAsync(GroupId id, CancellationToken cancellationToken);

		Domain.Entities.Group GetById(GroupId id);
		Domain.Entities.Group GetByIdAsNoTracking(GroupId id);

		Task<bool> GroupCodeExists(string code);

		Task<IEnumerable<Domain.Entities.Group>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip);

		Task<List<Domain.Entities.Group>> GetGroupsByUserIdAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken = default);

		Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default);

		Task<bool> AnyWithIdAsync(GroupId groupId, CancellationToken cancellation = default);

		Task AddAsync(Group group, CancellationToken cancellationToken);

		void Delete(Group group);

	}
}
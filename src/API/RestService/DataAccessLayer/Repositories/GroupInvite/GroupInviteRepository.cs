using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.GroupInvite
{
	public class GroupInviteRepository : BaseRepository<Domain.Entities.GroupInvite, GroupInviteId>,
		IGroupInviteRepository
	{
		public GroupInviteRepository(CarpoolDbContext context) : base(context) { }

		public async Task<Domain.Entities.GroupInvite> GetByIdAsync(GroupInviteId id,
			CancellationToken cancellationToken = default)
			=> await _context.GroupInvites.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
				.ConfigureAwait(false);

		public async Task<Domain.Entities.GroupInvite> GetByIdAsNoTrackingAsync(GroupInviteId id,
			CancellationToken cancellationToken =
				default)
			=> await _context.GroupInvites.AsNoTracking()
				.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
				.ConfigureAwait(false);

		public Domain.Entities.GroupInvite GetById(GroupInviteId id)
			=> _context.GroupInvites.FirstOrDefault(x => x.Id == id);

		public Domain.Entities.GroupInvite GetByIdAsNoTracking(GroupInviteId id)
			=> _context.GroupInvites.AsNoTracking().FirstOrDefault(x => x.Id == id);

		public async Task<List<Domain.Entities.GroupInvite>> GetPartAsync(CancellationToken cancellationToken)
			=> await _context.GroupInvites.ToListAsync(cancellationToken).ConfigureAwait(false);

		public async Task<List<Domain.Entities.GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken)
			=> await _context.GroupInvites.AsNoTracking()
				.Where(x => x.InvitedAppUserId == appUserId)
				.OrderByDescending(x => x.DateAdded)
				.ToListAsync(cancellationToken)
				.ConfigureAwait(false);
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.GroupInvite
{
	public class GroupInviteRepository : BaseRepository<Domain.Entities.GroupInvite, Guid>, IGroupInviteRepository
	{
		public GroupInviteRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<Domain.Entities.GroupInvite> GetByIdAsync(Guid id,
		                                                            CancellationToken cancellationToken = default)
			=> await _context.GroupInvites.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public async Task<Domain.Entities.GroupInvite> GetByIdAsNoTrackingAsync(Guid id,
		                                                                 CancellationToken cancellationToken =
			                                                                 default)
			=> await _context.GroupInvites.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public Domain.Entities.GroupInvite GetById(Guid id)
			=> _context.GroupInvites.FirstOrDefault(x => x.Id == id);

		public Domain.Entities.GroupInvite GetByIdAsNoTracking(Guid id)
			=> _context.GroupInvites.AsNoTracking().FirstOrDefault(x => x.Id == id);

		public async Task<List<Domain.Entities.GroupInvite>> GetPartAsync(CancellationToken cancellationToken)
			=> await _context.GroupInvites.ToListAsync(cancellationToken).ConfigureAwait(false);

		public async Task<List<Domain.Entities.GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(Guid userId,
			CancellationToken cancellationToken)
			=> await _context.GroupInvites.AsNoTracking().Where(x => x.InvitedUserId == userId)
			                 .OrderByDescending(x => x.DateAdded).ToListAsync(cancellationToken).ConfigureAwait(false);
	}
}
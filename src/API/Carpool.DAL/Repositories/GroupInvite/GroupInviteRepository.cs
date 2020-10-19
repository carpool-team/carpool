using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.GroupInvite
{
	public class GroupInviteRepository : BaseRepository<Core.Models.GroupInvite, Guid>, IGroupInviteRepository
	{
		public GroupInviteRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<Core.Models.GroupInvite> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
			=> await _context.GroupInvites.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public async Task<Core.Models.GroupInvite> GetByIdAsNoTrackingAsync(Guid id,
		                                                                    CancellationToken cancellationToken =
			                                                                    default)
			=> await _context.GroupInvites.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public Core.Models.GroupInvite GetById(Guid id)
			=> _context.GroupInvites.FirstOrDefault(x => x.Id == id);

		public Core.Models.GroupInvite GetByIdAsNoTracking(Guid id)
			=> _context.GroupInvites.AsNoTracking().FirstOrDefault(x => x.Id == id);

		public async Task<List<Core.Models.GroupInvite>> GetPartAsync(CancellationToken cancellationToken)
			=> await _context.GroupInvites.ToListAsync(cancellationToken).ConfigureAwait(false);

		public async Task<List<Core.Models.GroupInvite>> GetUserGroupInvitesByUserIdAsNoTrackingAsync(
			Guid userId,
			CancellationToken cancellationToken)
			=> await _context.GroupInvites.AsNoTracking().Where(x => x.InvitedUserId == userId).OrderByDescending(x => x.DateAdded).ToListAsync(cancellationToken).ConfigureAwait(false);
	}
}
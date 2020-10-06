using System;
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
			=> await _context.GroupInvites.Include(x => x.InvitedUser)
			                 .ThenInclude(y => y.UserGroups).FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
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
	}
}
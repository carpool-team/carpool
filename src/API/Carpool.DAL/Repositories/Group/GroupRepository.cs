using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Group
{
	public class GroupRepository : BaseRepository<Core.Models.Group, Guid>, IGroupRepository
	{
		public GroupRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<Core.Models.Group> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
		{
			return await _context.Groups
			                     .AsNoTracking()
			                     //.Include(group => group.Rides)
			                     .Include(group => group.Location)
			                     .Include(group => group.Owner)
			                     .FirstOrDefaultAsync(group => group.Id == id, cancellationToken).ConfigureAwait(false);
		}

		public async Task<Core.Models.Group> GetByIdAsNoTrackingAsync(Guid id,
		                                                              CancellationToken cancellationToken = default)
		{
			return await _context.Groups
			                     .Include(group => group.Rides)
			                     .Include(group => group.UserGroups)
			                     .Include(group => group.Location)
			                     .Include(group => group.Owner)
			                     .FirstOrDefaultAsync(group => group.Id == id, cancellationToken).ConfigureAwait(false);
		}

		public Core.Models.Group GetById(Guid id)
		{
			return _context.Groups
			               .AsNoTracking()
			               //.Include(group => group.Rides)
			               .Include(group => group.Location)
			               .Include(group => group.Owner)
			               .FirstOrDefault(group => group.Id == id);
		}

		public Core.Models.Group GetByIdAsNoTracking(Guid id)
		{
			return _context.Groups
			               //.Include(group => group.Rides)
			               .Include(group => group.Location)
			               .Include(group => group.Owner)
			               .FirstOrDefault(group => group.Id == id);
		}


		public async Task<bool> GroupCodeExists(string code)
		{
			return await _context.Groups.AnyAsync(group => group.Code == code).ConfigureAwait(false);
		}

		public async Task<IEnumerable<Core.Models.Group>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip)
		{
			var groups = await _context.Groups
			                           .AsNoTracking()
			                           .Include(group => group.Rides)
			                           .Include(group => group.UserGroups)
			                           .Include(group => group.Location)
			                           .Skip(pagesToSkip * pageCount)
			                           .Take(pageCount)
			                           .ToListAsync().ConfigureAwait(false);

			return groups;
		}

		public async Task<List<Core.Models.Group>> GetGroupsByUserIdAsNoTrackingAsync(
			Guid userId,
			CancellationToken cancellationToken)
		{
			var groupIds = await _context.UserGroups.AsNoTracking().Where(x => x.UserId == userId)
			                             .Select(x => x.GroupId).ToListAsync(cancellationToken).ConfigureAwait(false);

			var groups = await _context.Groups.Where(x => groupIds.Contains(x.Id)).ToListAsync(cancellationToken)
			                           .ConfigureAwait(false);

			return groups;
		}

		public async Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default)
		{
			await _context.UserGroups.AddAsync(userGroup, cancellationToken).ConfigureAwait(false);
		}
	}
}
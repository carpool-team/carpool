using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.Group
{
	public class GroupRepository : BaseRepository<Domain.Entities.Group, GroupId>, IGroupRepository
	{
		public GroupRepository(CarpoolDbContext context) : base(context) { }

		public async Task<Domain.Entities.Group> GetByIdAsync(GroupId id, CancellationToken cancellationToken = default)
		{
			return await _context.Groups
				//.Include(group => group.Rides)
				.Include(group => group.Location)
				.Include(group => group.Owner)
				.FirstOrDefaultAsync(group => group.Id == id, cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task<Domain.Entities.Group> GetByIdAsNoTrackingAsync(GroupId id,
			CancellationToken cancellationToken = default)
		{
			return await _context.Groups
				.AsNoTracking()
				.Include(group => group.Rides)
				.Include(group => group.UserGroups)
				.Include(group => group.Location)
				.Include(group => group.Owner)
				.FirstOrDefaultAsync(group => group.Id == id, cancellationToken)
				.ConfigureAwait(false);
		}

		public Domain.Entities.Group GetById(GroupId id)
		{
			return _context.Groups
				.AsNoTracking()
				//.Include(group => group.Rides)
				.Include(group => group.Location)
				.Include(group => group.Owner)
				.FirstOrDefault(group => group.Id == id);
		}

		public Domain.Entities.Group GetByIdAsNoTracking(GroupId id)
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

		public async Task<IEnumerable<Domain.Entities.Group>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip)
		{
			var groups = await _context.Groups
				.AsNoTracking()
				.Include(group => group.Rides)
				.Include(group => group.UserGroups)
				.Include(group => group.Location)
				.Skip(pagesToSkip * pageCount)
				.Take(pageCount)
				.ToListAsync()
				.ConfigureAwait(false);

			return groups;
		}

		public async Task<List<Domain.Entities.Group>> GetGroupsByUserIdAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken)
		{
			var groupIds = await _context.UserGroups.AsNoTracking()
				.Where(x => x.AppUserId == appUserId)
				.Select(x => x.GroupId)
				.ToListAsync(cancellationToken)
				.ConfigureAwait(false);

			var groups = await _context.Groups.Where(x => groupIds.Contains(x.Id))
				.ToListAsync(cancellationToken)
				.ConfigureAwait(false);

			return groups;
		}

		public async Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default)
		{
			await _context.UserGroups.AddAsync(userGroup, cancellationToken).ConfigureAwait(false);
		}
	}
}
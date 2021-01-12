using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.Entities.Intersections;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
	public class GroupRepository : IGroupRepository
	{
		private readonly CarpoolDbContext _context;

		public GroupRepository(CarpoolDbContext context)
			=> _context = context;

		public async Task<Group> GetByIdAsync(GroupId id, CancellationToken cancellationToken = default)
		{
			return await _context.Groups
			                     //.Include(group => group.Rides)
			                     .Include(group => group.Location)
			                     .Include(group => group.Owner)
			                     .Include(group => group.UserGroups)
			                     .FirstOrDefaultAsync(group => group.Id == id, cancellationToken)
			                     .ConfigureAwait(false);
		}

		public async Task<Group> GetByIdAsNoTrackingAsync(GroupId id,
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

		public Group GetByIdAsNoTracking(GroupId id)
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

		public async Task<List<Group>> GetGroupsByUserIdAsNoTrackingAsync(AppUserId appUserId,
		                                                                  CancellationToken cancellationToken)
		{
			var groupIds = await _context.UserGroups.AsNoTracking()
			                             .Where(x => x.AppUserId == appUserId)
			                             .Select(x => x.GroupId)
			                             .ToListAsync(cancellationToken)
			                             .ConfigureAwait(false);

			var groups = await _context.Groups.Where(x => groupIds.Contains(x.Id))
			                           .Include(x => x.UserGroups)
			                           .Include(x => x.Rides)
			                           .Include(x => x.Owner)
			                           .AsNoTracking()
			                           .ToListAsync(cancellationToken)
			                           .ConfigureAwait(false);

			return groups;
		}

		public async Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default)
			=> await _context.UserGroups.AddAsync(userGroup, cancellationToken);


		public Task<bool> AnyWithIdAsync(GroupId groupId, CancellationToken cancellation = default)
			=> _context.Set<Group>().AnyAsync(x => x.Id == groupId, cancellation);

		public async Task<bool> DoesUserExistsInGroup(GroupId groupId,
		                                              AppUserId appUserId,
		                                              CancellationToken cancellationToken = default)
			=> await _context.Set<Group>()
			                 .Include(x => x.UserGroups)
			                 .Where(x => x.Id == groupId)
			                 .Select(x => x.UserGroups)
			                 .AnyAsync(x => x.Any(y => y.AppUserId == appUserId), cancellationToken);


		public async Task AddAsync(Group group, CancellationToken cancellationToken)
			=> await _context.Set<Group>().AddAsync(@group, cancellationToken);

		public void Delete(Group group)
			=> _context.Set<Group>().Remove(group);

		public async Task<ICollection<Ride>> GetGroupRides(GroupId groupId,
		                                                   CancellationToken cancellationToken = default)
			=> await _context.Set<Ride>()
			                 .Include(x => x.Owner)
			                 .Include(x => x.Group)
			                 .Include(x => x.Stops)
			                 .Where(x => x.GroupId == groupId
			                 && x.Date > DateTime.Now)
			                 .OrderBy(x => x.Date)
			                 .ToListAsync(cancellationToken);
	}
}
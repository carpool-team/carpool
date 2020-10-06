﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
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
                .Include(group => group.Rides)
                .Include(group => group.Location)
                    .ThenInclude(location => location.Coordinates)
                .Include(group => group.Owner)
                .Include(group => group.UserGroups)
                .FirstOrDefaultAsync(group => group.Id == id, cancellationToken: cancellationToken).ConfigureAwait(false);
        }
        public async Task<Core.Models.Group> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Groups
                .Include(group => group.Rides)
                .Include(group => group.Location)
                .ThenInclude(location => location.Coordinates)
                .Include(group => group.Owner)
                .Include(group => group.UserGroups)
                .FirstOrDefaultAsync(group => group.Id == id, cancellationToken: cancellationToken).ConfigureAwait(false);
        }

        public Core.Models.Group GetById(Guid id)
        {
            return _context.Groups
                .AsNoTracking()
                .Include(group => group.Rides)
                .Include(group => group.Location)
                .ThenInclude(location => location.Coordinates)
                .Include(group => group.Owner)
                .Include(group => group.UserGroups)
                .FirstOrDefault(group => group.Id == id);
        }

        public Core.Models.Group GetByIdAsNoTracking(Guid id)
        {
            return _context.Groups
                .Include(group => group.Rides)
                .Include(group => group.Location)
                .ThenInclude(location => location.Coordinates)
                .Include(group => group.Owner)
                .Include(group => group.UserGroups)
                .FirstOrDefault(group => group.Id == id);
        }



        public async Task<bool> GroupCodeExists(string code)
        {
            return await _context.Groups.AnyAsync(group => group.Code == code).ConfigureAwait(false);
        }

        public async IAsyncEnumerable<Core.Models.Group> GetRangeAsync(int pageCount, int pagesToSkip)
        {
            var iterator = _context.Groups
                .AsNoTracking()
                .Include(group => group.Rides)
                .Include(group => group.UserGroups)
                .Include(group => group.Location)
                    .ThenInclude(location => location.Coordinates)
                .Skip(pagesToSkip * pageCount)
                .Take(pageCount)
                .AsAsyncEnumerable().GetAsyncEnumerator();
            while (await iterator.MoveNextAsync().ConfigureAwait(false))
            {
                yield return iterator.Current;
            }
        }
    }
}

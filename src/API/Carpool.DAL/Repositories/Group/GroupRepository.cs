using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Group
{
    public class GroupRepository : BaseRepository<Core.Models.Group>, IGroupRepository
    {
        public GroupRepository(CarpoolDbContext context) : base(context)
        {
        }

        public async Task<bool> GroupCodeExists(string code)
        {
            return await _context.Groups.AnyAsync(group => group.Code == code);
        }

        public async IAsyncEnumerable<Core.Models.Group> GetRangeAsync(int pageCount, int pagesToSkip)
        {
            var iterator = _context.Groups
                .Include(group => group.Rides)
                .Include(group => group.UserGroups)
                .Include(group => group.Location)
                    .ThenInclude(location => location.Coordinates)
                .Skip(pagesToSkip * pageCount)
                .Take(pageCount)
                .AsAsyncEnumerable().GetAsyncEnumerator();
            while (await iterator.MoveNextAsync())
            {
                yield return iterator.Current;
            }
        }
    }
}

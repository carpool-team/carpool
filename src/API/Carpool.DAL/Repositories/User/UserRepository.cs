using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly CarpoolDbContext _context;
        public UserRepository(CarpoolDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Core.Models.User> GetGroupUsersByGroupIdAsync(Guid id)
        {
            var iterator = _context.Users
                    .AsNoTracking()
                    .Include(user => user.UserGroups)
                    .Where(user => user.UserGroups.Any(group => group.GroupId == id))
                    .AsAsyncEnumerable().GetAsyncEnumerator();
            while (await iterator.MoveNextAsync().ConfigureAwait(false))
            {
                yield return iterator.Current;
            }
        }
    }
}

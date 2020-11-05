using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.User
{
	public class UserRepository : IUserRepository
	{
		private readonly CarpoolDbContext _context;

		public UserRepository(CarpoolDbContext context)
			=> _context = context;

		public async Task<List<Core.Models.User>> GetGroupUsersByGroupIdAsync(Guid id)
		{
			var users = await _context.Users
			                          .AsNoTracking()
			                          //.Include(user => user.UserGroups)
			                          //.Where(user => user.UserGroups.Any(group => group.GroupId == id))
			                          .ToListAsync().ConfigureAwait(false);

			return users;
		}

		public async Task<Core.Models.User> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public async Task<Core.Models.User> GetByIdAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken).ConfigureAwait(false);

		public async Task<List<Core.Models.User>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken)
			=> await _context.Users.ToListAsync(cancellationToken).ConfigureAwait(false);

		public void Dispose()
		{
		}

		public async Task AddAsync(Core.Models.User entity, CancellationToken cancellationToken)
			=> await _context.Users.AddAsync(entity, cancellationToken).ConfigureAwait(false);


		public void Add(Core.Models.User entity)
			=> _context.Users.Add(entity);

		public void Update(Core.Models.User entity)
			=> _context.Users.Update(entity);

		public void Delete(Core.Models.User entity)
			=> _context.Users.Remove(entity);

		public async Task DeleteByIdAsync(Guid id)
		{
			var entity = await _context.Users.FirstOrDefaultAsync(x => id.Equals(x.Id)).ConfigureAwait(false);
			_context.Users.Remove(entity);
		}

		public async Task SaveAsync(CancellationToken cancellationToken = default)
			=> await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

		public void Save()
			=> _context.SaveChanges();
	}
}
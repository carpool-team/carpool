using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly CarpoolDbContext _context;
		public UserRepository(CarpoolDbContext context)
			=> _context = context;

		public async Task<List<ApplicationUser>> GetGroupUsersByGroupIdAsync(GroupId id)
			=> await _context.Users
				.AsNoTracking()
				//.Include(user => user.UserGroups)
				//.Where(user => user.UserGroups.Any(group => group.GroupId == id))
				.ToListAsync()
				.ConfigureAwait(false);


		public async Task<IEnumerable<ApplicationUser>> GetUsersByEmail(string email, int page, int count)
			=> await _context.Users.AsNoTracking()
				.Where(x => x.Email.Contains(email))
				.Skip(page * count)
				.Take(count)
				.ToListAsync();

		public async Task<ApplicationUser> GetByIdAsNoTrackingAsync(AppUserId id, CancellationToken cancellationToken)
			=> await _context.Users.AsNoTracking()
				.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
				.ConfigureAwait(false);

		public async Task<ApplicationUser> GetByIdAsync(AppUserId id, CancellationToken cancellationToken)
			=> await _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken).ConfigureAwait(false);

		public async Task<List<ApplicationUser>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken)
			=> await _context.Users.ToListAsync(cancellationToken).ConfigureAwait(false);

		public void Dispose() { }

		public async Task AddAsync(ApplicationUser entity, CancellationToken cancellationToken)
			=> await _context.Users.AddAsync(entity, cancellationToken).ConfigureAwait(false);


		public void Add(ApplicationUser entity)
			=> _context.Users.Add(entity);

		public void Update(ApplicationUser entity)
			=> _context.Users.Update(entity);

		public void Delete(ApplicationUser entity)
			=> _context.Users.Remove(entity);

		public async Task DeleteByIdAsync(AppUserId id)
		{
			var entity = await _context.Users.FirstOrDefaultAsync(x => id.Equals(x.Id)).ConfigureAwait(false);
			_context.Users.Remove(entity);
		}

		public async Task SaveAsync(CancellationToken cancellationToken = default)
			=> await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

		public void Save()
			=> _context.SaveChanges();

		public async Task<bool> AnyWithId(AppUserId id)
			=> await _context.Users.AnyAsync(x => x.Id.Equals(id)).ConfigureAwait(false);

		public async Task<bool> ExistsWithId(AppUserId id, CancellationToken cancellationToken)
			=> await _context.Users.AnyAsync(x => x.Id == id, cancellationToken).ConfigureAwait(false);

		public async Task<double> GetUserRatingAsync(AppUserId appUserId, CancellationToken cancellationToken)
		{
			var user = await _context.Users.Include(x => x.Ratings)
				.SingleOrDefaultAsync(x => x.Id == appUserId, cancellationToken);
			
			return user.Rating;
		}
	}
}
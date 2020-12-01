﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.User
{
	public class UserRepository : BaseRepository<ApplicationUser, AppUserId>, IUserRepository
	{
		public UserRepository(CarpoolDbContext context) : base(context) { }

		//TODO: implement get group users by group id
		public async Task<List<ApplicationUser>> GetGroupUsersByGroupIdAsync(GroupId id)
		{
			var users = await _context.Users
				.AsNoTracking()
				//.Include(user => user.UserGroups)
				//.Where(user => user.UserGroups.Any(group => group.GroupId == id))
				.ToListAsync()
				.ConfigureAwait(false);

			return users;
		}

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
				.SingleOrDefaultAsync(x => x.Id == appUserId, cancellationToken)
				.ConfigureAwait(false);

			var count = 0;
			foreach (var rating in user.Ratings)
				count++;
			return count == 0 ? 0 : (double) user.Ratings.Sum(x => x.Value) / count;
		}
	}
}
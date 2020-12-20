using System;
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
	public class RideRequestRepository : IRideRequestRepository
	{
		private readonly CarpoolDbContext _dbContext;
		
		public RideRequestRepository(CarpoolDbContext dbContext) 
		{
			_dbContext = dbContext;
		}

		public async Task<RideRequest> GetByIdAsync(RideRequestId id, CancellationToken cancellationToken)
			=> await _dbContext.Set<RideRequest>()
				.Include(x => x.Ride)
				.Include(x => x.RequestingUser)
				.Include(x => x.RideOwner)
				.SingleOrDefaultAsync(x => x.Id == id, cancellationToken);

		public async Task<RideRequest> GetByIdAsNoTrackingAsync(RideRequestId id, CancellationToken cancellationToken)
			=> await _dbContext.Set<RideRequest>()
				.Include(x => x.Ride)
				.Include(x => x.RequestingUser)
				.Include(x => x.RideOwner)
				.AsNoTracking()
				.SingleOrDefaultAsync(x => x.Id == id, cancellationToken);
		
		public async Task<List<RideRequest>> GetPartAsync(CancellationToken cancellationToken)
			=> throw new NotImplementedException();

		public async Task<IEnumerable<RideRequest>> GetUserPendingRideRequestAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken = default)
			=> await _dbContext.Set<RideRequest>()
				.Include(x => x.Ride)
				.Include(x => x.RequestingUser)
				.Include(x => x.RideOwner)
				.Where(x => x.IsPending && (x.RequestingUserId == appUserId || x.RideOwnerId == appUserId))
				.ToListAsync(cancellationToken);

		public async Task AddAsync(RideRequest groupInvite, CancellationToken cancellationToken)
			=> await _dbContext.Set<RideRequest>()
				.AddAsync(groupInvite, cancellationToken);

		public void Delete(RideRequest groupInvite)
		{
			throw new NotImplementedException();
		}
	}
}
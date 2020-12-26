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
	public class StopRepository : IStopRepository
	{
		private readonly CarpoolDbContext _dbContext;

		public StopRepository(CarpoolDbContext dbContext)
			=> _dbContext = dbContext;

		public async Task<List<Stop>> GetStopsByRideId(RideId rideId, CancellationToken cancellationToken)
			=> await _dbContext.Set<Stop>().Where(x => x.RideId == rideId)
			                   .Include(a => a.Participant)
			                   .ToListAsync(cancellationToken)
			                   .ConfigureAwait(false);
	}
}
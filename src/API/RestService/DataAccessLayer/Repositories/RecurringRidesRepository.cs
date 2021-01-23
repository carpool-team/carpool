using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Aggregates;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
	public class RecurringRidesRepository : IRecurringRidesRepository
	{
		private readonly CarpoolDbContext _dbContext;

		public RecurringRidesRepository(CarpoolDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<RecurringRides> GetByIdAsync(RecurringRideId recurringRideId, CancellationToken cancellationToken = default)
			=> await _dbContext.Set<RecurringRides>()
			             .Include(x => x.Rides)
			             .SingleOrDefaultAsync(x => x.Id == recurringRideId, cancellationToken);

		public async Task AddAsync(RecurringRides recurringRides, CancellationToken cancellationToken = default)
			=> await _dbContext.Set<RecurringRides>().AddAsync(recurringRides, cancellationToken);

		public void Delete(RecurringRides recurringRides)
			=> _dbContext.Set<RecurringRides>().Remove(recurringRides);
	}
}
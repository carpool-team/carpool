using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Aggregates;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories
{
	public class RecurringRidesRepository : IRecurringRidesRepository
	{
		private readonly CarpoolDbContext _dbContext;

		public RecurringRidesRepository(CarpoolDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task AddAsync(RecurringRides recurringRides, CancellationToken cancellationToken = default)
			=> await _dbContext.Set<RecurringRides>().AddAsync(recurringRides, cancellationToken);
	}
}
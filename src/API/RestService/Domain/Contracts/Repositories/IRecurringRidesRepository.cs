using System.Threading;
using System.Threading.Tasks;
using Domain.Aggregates;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IRecurringRidesRepository
	{
		Task<RecurringRides> GetByIdAsync(RecurringRideId recurringRideId,
		                                  CancellationToken cancellationToken = default);
		
		Task AddAsync(RecurringRides recurringRides, CancellationToken cancellationToken = default);

		void Delete(RecurringRides recurringRides);
	}
}
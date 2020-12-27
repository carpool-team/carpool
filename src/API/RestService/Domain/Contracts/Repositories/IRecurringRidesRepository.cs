using System.Threading;
using System.Threading.Tasks;
using Domain.Aggregates;

namespace Domain.Contracts.Repositories
{
	public interface IRecurringRidesRepository
	{
		Task AddAsync(RecurringRides recurringRides, CancellationToken cancellationToken = default);
	}
}
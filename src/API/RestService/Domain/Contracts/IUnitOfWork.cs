using System.Threading;
using System.Threading.Tasks;

namespace Domain.Contracts
{
	public interface IUnitOfWork
	{
		void Save();
		Task SaveAsync(CancellationToken cancellationToken);

		void Rollback();
		Task RollbackAsync();
	}
}
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories
{
	public interface IUnitOfWork
	{
		void Save();
		Task SaveAsync(CancellationToken cancellationToken);

		void Rollback();
		Task RollbackAsync();
	}
}
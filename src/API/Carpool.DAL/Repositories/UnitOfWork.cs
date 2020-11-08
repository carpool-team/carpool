using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;

namespace Carpool.DAL.Repositories
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly CarpoolDbContext _context;

		public UnitOfWork(CarpoolDbContext context)
		{
			_context = context;
		}

		public void Save()
			=> _context.SaveChanges();
		
		public async Task SaveAsync(CancellationToken cancellationToken = default)
			=> await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

		public void Rollback()
			=> _context.Dispose();

		public async Task RollbackAsync()
			=> await _context.DisposeAsync().ConfigureAwait(false);
	}
}
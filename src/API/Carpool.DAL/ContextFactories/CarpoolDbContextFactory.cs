using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.ContextFactories
{
	public class CarpoolDbContextFactory
	{
		private readonly DbContextOptions<CarpoolDbContext> _options;

		public CarpoolDbContextFactory(DbContextOptions<CarpoolDbContext> options)
		{
			_options = options;
		}

		public CarpoolDbContext GetNewDbContext()
		{
			return new CarpoolDbContext(_options);
		}
	}
}
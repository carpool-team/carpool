using DataAccessLayer.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.ContextFactories
{
	public class CarpoolDbContextFactory
	{
		private readonly DbContextOptions<CarpoolDbContext> _options;

		public CarpoolDbContextFactory(DbContextOptions<CarpoolDbContext> options)
			=> _options = options;

		public CarpoolDbContext GetNewDbContext()
			=> new(_options);
	}
}
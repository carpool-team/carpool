using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Company
{
	public class CompanyRepository : BaseRepository<Core.Models.Company, int>, ICompanyRepository
	{
		public CompanyRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<Core.Models.Company> GetByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			return await _context.Companies.FirstOrDefaultAsync(company => company.Id == id, cancellationToken)
			                     .ConfigureAwait(false);
		}

		public async Task<Core.Models.Company> GetByIdAsNoTrackingAsync(
			int id,
			CancellationToken cancellationToken = default)
		{
			return await _context.Companies.Include(x => x.Users).AsNoTracking()
			                     .FirstOrDefaultAsync(company => company.Id == id, cancellationToken)
			                     .ConfigureAwait(false);
		}

		public Core.Models.Company GetById(int id)
		{
			return _context.Companies.FirstOrDefault(company => company.Id == id);
		}

		public Core.Models.Company GetByIdAsNoTracking(int id)
		{
			return _context.Companies.AsNoTracking().FirstOrDefault(company => company.Id == id);
		}

		public async Task<List<Core.Models.Company>> GetRangeAsNoTrackingAsync(int pageCount, int pagesToSkip)
		{
			return await _context.Companies
			                       .AsNoTracking()
			                       .Skip(pagesToSkip * pageCount)
			                       .Take(pageCount)
			                       .ToListAsync().ConfigureAwait(false);

		}
	}
}
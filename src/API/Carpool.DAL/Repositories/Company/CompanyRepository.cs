using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Company
{
    public class CompanyRepository : BaseRepository<Core.Models.Company>, ICompanyRepository
    {
        public CompanyRepository(CarpoolDbContext context) : base(context)
        {
        }

        public async Task<Core.Models.Company> GetByIdAsync(Guid id)
        {
            return await _context.Companies.FirstOrDefaultAsync(company => company.Id == id);
        }

        public async Task<Core.Models.Company> GetByIdAsNoTrackingAsync(Guid id)
        {
            return await _context.Companies.AsNoTracking().FirstOrDefaultAsync(company => company.Id == id);
        }

        public Core.Models.Company GetById(Guid id)
        {
            return _context.Companies.FirstOrDefault(company => company.Id == id);
        }

        public Core.Models.Company GetByIdAsNoTracking(Guid id)
        {
            return _context.Companies.AsNoTracking().FirstOrDefault(company => company.Id == id);
        }

        public async IAsyncEnumerable<Core.Models.Company> GetRangeAsync(int pageCount, int pagesToSkip)
        {
            var iterator = _context.Companies
                .AsNoTracking()
                .Skip(pagesToSkip * pageCount)
                .Take(pageCount)
                .AsAsyncEnumerable().GetAsyncEnumerator();
            while (await iterator.MoveNextAsync())
            {
                yield return iterator.Current;
            }
        }
    }
}

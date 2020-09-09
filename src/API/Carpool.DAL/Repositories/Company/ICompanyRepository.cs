using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Company
{
    public interface ICompanyRepository : IBaseRepository<Core.Models.Company>
    {
        Task<Core.Models.Company> GetByIdAsync(Guid id);
        Task<Core.Models.Company> GetByIdAsNoTrackingAsync(Guid id);

        Core.Models.Company GetById(Guid id);
        Core.Models.Company GetByIdAsNoTracking(Guid id);
        IAsyncEnumerable<Core.Models.Company> GetRangeAsync(int pageCount, int pagesToSkip);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Company
{
    public interface ICompanyRepository : IBaseRepository<Core.Models.Company, int>
    {
        Task<Core.Models.Company> GetByIdAsync(int id, CancellationToken cancellationToken);
        Task<Core.Models.Company> GetByIdAsNoTrackingAsync(int id, CancellationToken cancellationToken);

        Core.Models.Company GetById(int id);
        Core.Models.Company GetByIdAsNoTracking(int id);
        IAsyncEnumerable<Core.Models.Company> GetRangeAsync(int pageCount, int pagesToSkip);
    }
}

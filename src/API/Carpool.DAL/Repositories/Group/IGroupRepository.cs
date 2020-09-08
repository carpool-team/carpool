using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Group
{
    public interface IGroupRepository : IBaseRepository<Core.Models.Group>
    {
        Task<Core.Models.Group> GetByIdAsync(Guid id);
        Task<Core.Models.Group> GetByIdAsNoTrackingAsync(Guid id);

        Core.Models.Group GetById(Guid id);
        Core.Models.Group GetByIdAsNoTracking(Guid id);

        Task<bool> GroupCodeExists(string code);

        IAsyncEnumerable<Core.Models.Group> GetRangeAsync(int pageCount, int pagesToSkip);
    }
}

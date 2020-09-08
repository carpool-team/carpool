using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Ride
{
    public interface IRideRepository : IBaseRepository<Core.Models.Ride>
    {
        Task<Core.Models.Ride> GetByIdAsync(Guid id);
        Task<Core.Models.Ride> GetByIdAsNoTrackingAsync(Guid id);

        Core.Models.Ride GetById(Guid id);
        Core.Models.Ride GetByAsNoTrackingId(Guid id);
    }
}

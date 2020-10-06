using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Ride
{
    public interface IRideRepository : IBaseRepository<Core.Models.Ride, Guid>
    {
        Task<Core.Models.Ride> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Core.Models.Ride> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

        Core.Models.Ride GetById(Guid id);
        Core.Models.Ride GetByAsNoTrackingId(Guid id);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Ride
{
    public class RideRepository : BaseRepository<Core.Models.Ride, Guid>, IRideRepository
    {
        public RideRepository(CarpoolDbContext context) : base(context)
        {
        }

        public async Task<Core.Models.Ride> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Rides.FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken: cancellationToken).ConfigureAwait(false);
        }

        public async Task<Core.Models.Ride> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Rides.AsNoTracking().FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken: cancellationToken).ConfigureAwait(false);
        }

        public Core.Models.Ride GetById(Guid id)
        {
            return _context.Rides.FirstOrDefault(ride => ride.Id == id);
        }

        public Core.Models.Ride GetByAsNoTrackingId(Guid id)
        {
            return _context.Rides.AsNoTracking().FirstOrDefault(ride => ride.Id == id);
        }
    }
}

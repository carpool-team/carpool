using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Ride
{
    public class RideRepository : BaseRepository<Core.Models.Ride>, IRideRepository
    {
        public RideRepository(CarpoolDbContext context) : base(context)
        {
        }

        public async Task<Core.Models.Ride> GetByIdAsync(Guid id)
        {
            var ride = await _context.Rides.FirstOrDefaultAsync(ride => ride.Id == id);
            return ride;
        }

        public async Task<Core.Models.Ride> GetByIdAsNoTrackingAsync(Guid id)
        {
            var ride = await _context.Rides.AsNoTracking().FirstOrDefaultAsync(ride => ride.Id == id);
            return ride;
        }

        public Core.Models.Ride GetById(Guid id)
        {
            var ride = _context.Rides.FirstOrDefault(ride => ride.Id == id);
            return ride;
        }

        public Core.Models.Ride GetByAsNoTrackingId(Guid id)
        {
            var ride = _context.Rides.AsNoTracking().FirstOrDefault(ride => ride.Id == id);
            return ride;
        }
    }
}

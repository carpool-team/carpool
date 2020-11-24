using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.Ride
{
	public class RideRepository : BaseRepository<Domain.Entities.Ride, Guid>, IRideRepository
	{
		public RideRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<Domain.Entities.Ride> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
		{
			return await _context.Rides.FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken)
			                     .ConfigureAwait(false);
		}

		public async Task<Domain.Entities.Ride> GetByIdAsNoTrackingAsync(Guid id,
		                                                                 CancellationToken cancellationToken = default)
		{
			return await _context.Rides.AsNoTracking().FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken)
			                     .ConfigureAwait(false);
		}

		public Domain.Entities.Ride GetById(Guid id)
		{
			return _context.Rides.FirstOrDefault(ride => ride.Id == id);
		}

		public Domain.Entities.Ride GetByAsNoTrackingId(Guid id)
		{
			return _context.Rides.AsNoTracking().FirstOrDefault(ride => ride.Id == id);
		}

		public async Task<IEnumerable<Domain.Entities.Ride>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken)
		{
			return await _context.Rides
			                     .Include(ride => ride.Stops)
			                     .Include(ride => ride.StartingLocation)
			                     .Include(ride => ride.StartingLocation)
			                     .Include(ride => ride.Participants)
			                     .Include(ride => ride.Destination)
			                     .Include(ride => ride.Destination)
			                     .Where(ride => ride.Date >= DateTime.Now)
			                     .OrderBy(ride => ride.Date).ToListAsync(cancellationToken).ConfigureAwait(false);
		}

		public async Task<IEnumerable<Domain.Entities.Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(Guid userId,
			bool past = false,
			CancellationToken cancellationToken = default)
			=> await _context.Rides.Include(x => x.Participants).AsNoTracking()
			                 .Where(x => x.Participants.Any(y => y.UserId == userId) && past ?
				                             x.Date <= DateTime.Now :
				                             x.Date >= DateTime.Now).ToListAsync(cancellationToken)
			                 .ConfigureAwait(false);

		public async Task<IEnumerable<Domain.Entities.Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(Guid userId,
			bool past,
			CancellationToken cancellationToken)
			=> await _context.Rides.AsNoTracking()
			                 .Where(x => x.OwnerId == userId && past ? x.Date <= DateTime.Now : x.Date >= DateTime.Now)
			                 .ToListAsync(cancellationToken).ConfigureAwait(false);
	}
}
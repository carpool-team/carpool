using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using DataAccessLayer.IdGen;
using IdentifiersShared.Identifiers;
using IdGen;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.Ride
{
	public class RideRepository : BaseRepository<Domain.Entities.Ride, RideId>, IRideRepository
	{
		public RideRepository(CarpoolDbContext context) : base(context) { }

		public async Task<Domain.Entities.Ride> GetByIdAsync(RideId id, CancellationToken cancellationToken = default)
		{
			return await _context.Rides.FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task<Domain.Entities.Ride> GetByIdAsNoTrackingAsync(RideId id,
			CancellationToken cancellationToken = default)
		{
			return await _context.Rides.AsNoTracking()
				.FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken)
				.ConfigureAwait(false);
		}

		public Domain.Entities.Ride GetById(RideId id)
		{
			return _context.Rides.FirstOrDefault(ride => ride.Id == id);
		}

		public Domain.Entities.Ride GetByAsNoTrackingId(RideId id)
		{
			return _context.Rides.AsNoTracking().FirstOrDefault(ride => ride.Id == id);
		}

		public async Task<IEnumerable<Domain.Entities.Ride>> GetPartAsNoTrackingAsync(
			CancellationToken cancellationToken)
		{
			return await _context.Rides
				.Include(ride => ride.Stops)
				.Include(ride => ride.StartingLocation)
				.Include(ride => ride.StartingLocation)
				.Include(ride => ride.Participants)
				.Include(ride => ride.Destination)
				.Include(ride => ride.Destination)
				.Where(ride => ride.Date >= DateTime.Now)
				.OrderBy(ride => ride.Date)
				.ToListAsync(cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task<IEnumerable<Domain.Entities.Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(
			UserId userId,
			bool past = false,
			CancellationToken cancellationToken = default)
		{
			return await _context.Rides.Include(x => x.Participants)
				.AsNoTracking()
				.Where(x => x.Participants.Any(y => y.UserId == userId) && past
					? x.Date <= DateTime.Now
					: x.Date >= DateTime.Now)
				.ToListAsync(cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task<IEnumerable<Domain.Entities.Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(UserId userId,
			bool past,
			CancellationToken cancellationToken)
		{
			return await _context.Rides.AsNoTracking()
				.Where(x => x.OwnerId == userId && past ? x.Date <= DateTime.Now : x.Date >= DateTime.Now)
				.ToListAsync(cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task RemoveUserFromRide(UserId userId,
			RideId rideId,
			CancellationToken cancellationToken = default)
		{
			var rideParticipant = await _context.UserParticipatedRides
				.FirstOrDefaultAsync(x => x.RideId == rideId && x.UserId == userId, cancellationToken)
				.ConfigureAwait(false);
			_context.UserParticipatedRides.Remove(rideParticipant);
		}
		
		public async Task AddAsync(Domain.Entities.Ride ride, CancellationToken cancellationToken = default)
		{
			IdGenerator rideIdGenerator = new IdGenerator(IdGeneratorType.Ride);
			ride.Id = new RideId(rideIdGenerator.CreateId());
			await _context.Set<Domain.Entities.Ride>().AddAsync(ride, cancellationToken).ConfigureAwait(false);
		}
	}
}
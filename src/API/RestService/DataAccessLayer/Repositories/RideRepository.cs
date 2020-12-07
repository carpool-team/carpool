using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class RideRepository : IRideRepository
	{
		private readonly CarpoolDbContext _context;
		public RideRepository(CarpoolDbContext context)
			=> _context = context;

		public async Task<Ride> GetByIdAsync(RideId id, CancellationToken cancellationToken = default)
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

		public async Task<IEnumerable<Ride>> GetPartAsNoTrackingAsync(
			CancellationToken cancellationToken)
		{
			return await _context.Rides
				.Include(ride => ride.Stops)
				.Include(ride => ride.Participants)
				.Include(ride => ride.Location)
				.Include(ride => ride.Group)
				.Where(ride => ride.Date >= DateTime.Now)
				.OrderBy(ride => ride.Date)
				.ToListAsync(cancellationToken);
		}

		public async Task<IEnumerable<Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(
			AppUserId appUserId,
			bool past = false,
			CancellationToken cancellationToken = default)
		{
			return await _context.Rides.Include(x => x.Participants)
				.AsNoTracking()
				.Where(x => x.Participants.Any(y => y.AppUserId == appUserId) && past
					? x.Date <= DateTime.Now
					: x.Date >= DateTime.Now)
				.ToListAsync(cancellationToken);
		}

		public async Task<IEnumerable<Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			bool past,
			CancellationToken cancellationToken)
		{
			return await _context.Rides.AsNoTracking()
				.Where(x => x.OwnerId == appUserId && past ? x.Date <= DateTime.Now : x.Date >= DateTime.Now)
				.ToListAsync(cancellationToken);
		}

		public async Task RemoveUserFromRide(AppUserId appUserId,
			RideId rideId,
			CancellationToken cancellationToken = default)
		{
			var rideParticipant = await _context.UserParticipatedRides
				.FirstOrDefaultAsync(x => x.RideId == rideId && x.AppUserId == appUserId, cancellationToken)
				.ConfigureAwait(false);
			_context.UserParticipatedRides.Remove(rideParticipant);
		}
		
		public async Task AddAsync(Ride ride, CancellationToken cancellationToken = default)
		{
			IdGenerator rideIdGenerator = new IdGenerator(IdGeneratorType.Ride);
			ride.Id = new RideId(rideIdGenerator.CreateId());
			await _context.Set<Domain.Entities.Ride>().AddAsync(ride, cancellationToken);
		}

		public void Delete(Ride ride)
			=> _context.Set<Ride>().Remove(ride);
    }
}
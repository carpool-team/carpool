using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.Enums;
using IdentifiersShared.Identifiers;
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
			return await _context.Rides.Include(x => x.Owner)
				.Include(x => x.Group)
					.ThenInclude(a => a.UserGroups)
				.Include(x => x.Stops)
					.ThenInclude(a => a.Participant)
				.FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task<Ride> GetByIdAsNoTrackingAsync(RideId id,
			CancellationToken cancellationToken = default)
		{
			return await _context.Rides.AsNoTracking()
				.FirstOrDefaultAsync(ride => ride.Id == id, cancellationToken)
				.ConfigureAwait(false);
		}

		public Ride GetById(RideId id)
		{
			return _context.Rides.FirstOrDefault(ride => ride.Id == id);
		}

		public Ride GetByAsNoTrackingId(RideId id)
		{
			return _context.Rides.AsNoTracking().FirstOrDefault(ride => ride.Id == id);
		}

		public async Task<IEnumerable<Ride>> GetPartAsNoTrackingAsync(GroupId groupId,
			RideDirection rideDirection,
			DateTime dateTime,
			CancellationToken cancellationToken)
			=> await _context.Rides
				.Include(ride => ride.Stops)
				.Include(ride => ride.Location)
				.Include(ride => ride.Group)
					.ThenInclude(group => group.UserGroups)
				.Include(ride => ride.Owner)
					.ThenInclude(owner => owner.Vehicle)
				.Where(ride => ride.Date.Date == dateTime.Date
				               && ride.Date.TimeOfDay >= dateTime.TimeOfDay
				               && ride.GroupId == groupId
				               && ride.RideDirection == rideDirection)
				.OrderBy(ride => ride.Date)
				.ToListAsync(cancellationToken);

		public async Task<IEnumerable<Ride>> GetPartWhereUserNotParticipantAsNoTrackingAsync(GroupId groupId,
			AppUserId appUserId,
			RideDirection? rideDirection,
			DateTime dateTime,
			CancellationToken cancellationToken = default)
			=> await _context.Rides
				.Include(ride => ride.Stops)
					.ThenInclude(stop => stop.Participant)
				.Include(ride => ride.Location)
				.Include(ride => ride.Group)
					.ThenInclude(group => group.UserGroups)
				.Include(ride => ride.Owner)
					.ThenInclude(owner => owner.Vehicle)
				.Include(ride => ride.RideRequests)
				.Where(ride => ride.Date.Date = dateTime.Date
				               && ride.Date.TimeOfDay >= dateTime.TimeOfDay
				               && ride.GroupId == groupId
				               && (rideDirection == null || ride.RideDirection == rideDirection)
				               && ride.OwnerId != appUserId
				               && ride.Stops.All(x => x.ParticipantId != appUserId)
				               && ride.RideRequests.All(x => x.RequestingUserId != appUserId)
				               && ride.SeatsLimit > ride.Stops.Count)
				.OrderBy(ride => ride.Date)
				.ToListAsync(cancellationToken);

		public async Task<IEnumerable<Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			bool past = false,
			CancellationToken cancellationToken = default)
		{
			return await _context.Rides
				.Include(x => x.Owner)
					.ThenInclude(a => a.Ratings)
				.Include(x => x.Owner)
					.ThenInclude(a => a.Vehicle)
				.Include(x => x.Group)
					.ThenInclude(a => a.UserGroups)
				.Include(x => x.Stops)
					.ThenInclude(a => a.Participant)
				.AsNoTracking()
				.Where(x => x.Stops.Any(y => y.ParticipantId == appUserId)
				            && (past ? x.Date <= DateTime.Now : x.Date >= DateTime.Now))
				.OrderBy(x => x.Date)
				.ToListAsync(cancellationToken);
		}

		public async Task<IEnumerable<Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			bool past,
			CancellationToken cancellationToken)
		{
			return await _context.Rides.AsNoTracking()
				.Include(x => x.Owner)
					.ThenInclude(a => a.Ratings)
				.Include(x => x.Owner)
					.ThenInclude(a => a.Vehicle)
				.Include(x => x.Group)
					.ThenInclude(a => a.UserGroups)
				.Include(x => x.Stops)
					.ThenInclude(a => a.Participant)
				.Where(x => x.OwnerId == appUserId
				            && (past ? x.Date <= DateTime.Now : x.Date >= DateTime.Now))
				.OrderBy(x => x.Date)
				.ToListAsync(cancellationToken);
		}

		public async Task RemoveUserFromRide(AppUserId appUserId,
			RideId rideId,
			CancellationToken cancellationToken = default)
		{
			var rideParticipant = await _context.UserParticipatedRides
				.FirstOrDefaultAsync(
					x => x.RideId == rideId && x.AppUserId == appUserId,
					cancellationToken)
				.ConfigureAwait(false);

			_context.UserParticipatedRides.Remove(rideParticipant);
		}

		public async Task AddAsync(Ride ride, CancellationToken cancellationToken = default)
		{
			// IdGenerator rideIdGenerator = new IdGenerator(IdGeneratorType.Ride);
			// ride.Id = new RideId(rideIdGenerator.CreateId());
			await _context.Set<Ride>().AddAsync(ride, cancellationToken);
		}

		public void Delete(Ride ride)
			=> _context.Set<Ride>().Remove(ride);
	}
}
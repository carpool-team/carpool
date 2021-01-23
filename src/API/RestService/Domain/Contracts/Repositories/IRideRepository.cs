using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IRideRepository
	{
		Task<Ride> GetByIdAsync(RideId id, CancellationToken cancellationToken);
		Task<Ride> GetByIdAsNoTrackingAsync(RideId id, CancellationToken cancellationToken);

		Ride GetById(RideId id);
		Ride GetByAsNoTrackingId(RideId id);

		Task<IEnumerable<Ride>> GetPartAsNoTrackingAsync(GroupId groupId,
			RideDirection rideDirection,
			DateTimeOffset dateTime,
			CancellationToken cancellationToken = default);
		
		Task<IEnumerable<Ride>> GetPartWhereUserNotParticipantAsNoTrackingAsync(GroupId groupId,
			AppUserId appUserId,
			RideDirection? rideDirection,
			DateTimeOffset? dateTime,
			CancellationToken cancellationToken = default);

		Task<IEnumerable<Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			bool past,
			CancellationToken cancellationToken);

		Task<IEnumerable<Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(AppUserId appUserId,
			bool past,
			CancellationToken cancellationToken);

		Task RemoveUserFromRide(AppUserId appUserId, RideId rideId, CancellationToken cancellationToken);

		Task AddAsync(Ride ride, CancellationToken cancellationToken = default);

		void Delete(Ride ride);
	}
}
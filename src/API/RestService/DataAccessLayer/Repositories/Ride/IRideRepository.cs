using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories.Ride
{
	public interface IRideRepository : IBaseRepository<Domain.Entities.Ride, RideId>
	{
		Task<Domain.Entities.Ride> GetByIdAsync(RideId id, CancellationToken cancellationToken);
		Task<Domain.Entities.Ride> GetByIdAsNoTrackingAsync(RideId id, CancellationToken cancellationToken);

		Domain.Entities.Ride GetById(RideId id);
		Domain.Entities.Ride GetByAsNoTrackingId(RideId id);

		Task<IEnumerable<Domain.Entities.Ride>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<IEnumerable<Domain.Entities.Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(UserId userId,
		                                                                      bool past,
		                                                                      CancellationToken cancellationToken);

		Task<IEnumerable<Domain.Entities.Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(UserId userId,
		                                                               bool past,
		                                                               CancellationToken cancellationToken);

		Task RemoveUserFromRide(UserId userId, RideId rideId, CancellationToken cancellationToken);
	}
}
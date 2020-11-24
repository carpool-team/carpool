using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.Ride
{
	public interface IRideRepository : IBaseRepository<Domain.Entities.Ride, Guid>
	{
		Task<Domain.Entities.Ride> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Domain.Entities.Ride> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Domain.Entities.Ride GetById(Guid id);
		Domain.Entities.Ride GetByAsNoTrackingId(Guid id);

		Task<IEnumerable<Domain.Entities.Ride>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		Task<IEnumerable<Domain.Entities.Ride>> GetParticipatedRidesByUserIdAsNoTrackingAsync(Guid userId,
		                                                                      bool past,
		                                                                      CancellationToken cancellationToken);

		Task<IEnumerable<Domain.Entities.Ride>> GetOwnedRidesByUserIdAsNoTrackingAsync(Guid userId,
		                                                               bool past,
		                                                               CancellationToken cancellationToken);

		Task RemoveUserFromRide(Guid userId, Guid rideId, CancellationToken cancellationToken);
	}
}
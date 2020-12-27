using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IRideRequestRepository
	{
		Task<RideRequest> GetByIdAsync(RideRequestId id, CancellationToken cancellationToken);

		Task<RideRequest> GetByIdAsNoTrackingAsync(RideRequestId id,
			CancellationToken cancellationToken);

		Task<List<RideRequest>> GetPartAsync(CancellationToken cancellationToken);

		Task<IEnumerable<RideRequest>> GetParticipantPendingRideRequestAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken = default);
		
		Task<IEnumerable<RideRequest>> GetOwnerPendingRideRequestAsNoTrackingAsync(AppUserId appUserId,
			CancellationToken cancellationToken = default);

		Task AddAsync(RideRequest groupInvite, CancellationToken cancellationToken);

		void Delete(RideRequest groupInvite);
	}
}
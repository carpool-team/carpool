using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IRideParticipantRepository
	{
		Task<List<UserParticipatedRide>> GetParticipantsByRideId(RideId rideId, CancellationToken cancellationToken);
		Task SaveAsync(CancellationToken cancellationToken);
	}
}
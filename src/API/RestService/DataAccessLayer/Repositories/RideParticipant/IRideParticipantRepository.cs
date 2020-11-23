using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities.Intersections;

namespace DataAccessLayer.Repositories.RideParticipant
{
	public interface IRideParticipantRepository
	{
		Task<List<UserParticipatedRide>> GetParticipantsByRideId(Guid rideId, CancellationToken cancellationToken);
		Task SaveAsync(CancellationToken cancellationToken);
	}
}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;

namespace DataAccessLayer.Repositories.RideParticipant
{
	public interface IRideParticipantRepository
	{
		Task<List<UserParticipatedRide>> GetParticipantsByRideId(RideId rideId, CancellationToken cancellationToken);
		Task SaveAsync(CancellationToken cancellationToken);
	}
}
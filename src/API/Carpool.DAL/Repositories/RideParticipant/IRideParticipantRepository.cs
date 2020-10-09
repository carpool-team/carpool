using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Models.Intersections;

namespace Carpool.DAL.Repositories.RideParticipant
{
	public interface IRideParticipantRepository
	{
		Task<List<UserParticipatedRide>> GetParticipantsByRideId(Guid rideId, CancellationToken cancellationToken);
		Task SaveAsync(CancellationToken cancellationToken);
	}
}
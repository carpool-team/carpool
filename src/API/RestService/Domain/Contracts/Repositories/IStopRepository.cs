using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IStopRepository
	{
		Task<List<Stop>> GetStopsByRideId(RideId rideId, CancellationToken cancellationToken);
	}
}
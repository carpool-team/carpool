using System;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.RideRequest
{
	public interface IRideRequestRepository : IBaseRepository<Core.Models.RideRequest, Guid>
	{
		Task<Core.Models.RideRequest> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Core.Models.RideRequest> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Core.Models.RideRequest GetById(Guid id);
		Core.Models.RideRequest GetByAsNoTrackingId(Guid id);	
	}
}
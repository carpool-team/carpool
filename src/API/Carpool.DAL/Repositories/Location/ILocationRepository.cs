using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Location
{
	public interface ILocationRepository : IBaseRepository<Core.Models.Location, Guid>
	{
		Task<IEnumerable<Carpool.Core.Models.Location>> GetPartAsync(CancellationToken cancellationToken);
		Task<IEnumerable<Carpool.Core.Models.Location>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken);

		IEnumerable<Carpool.Core.Models.Location> GetPart(CancellationToken cancellationToken);
		IEnumerable<Carpool.Core.Models.Location> GetPartAsNoTracking(CancellationToken cancellationToken);

		Task<Core.Models.Location> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		Task<Core.Models.Location> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken);

		Core.Models.Location GetById(Guid id);
		Core.Models.Location GetByIdAsNoTracking(Guid id);

		Task<Core.Models.Location> GetByCoordsAsync(double longitude,
		                                            double latitude,
		                                            CancellationToken cancellationToken);
	}
}
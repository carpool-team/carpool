using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.RideRequest
{
	public class RideRequestRepository : BaseRepository<Core.Models.RideRequest, Guid>, IRideRequestRepository
	{
		public RideRequestRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<Core.Models.RideRequest> GetByIdAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.RideRequests.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public async Task<Core.Models.RideRequest> GetByIdAsNoTrackingAsync(
			Guid id,
			CancellationToken cancellationToken)
			=> await _context.RideRequests.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
			                 .ConfigureAwait(false);

		public Core.Models.RideRequest GetById(Guid id)
			=> _context.RideRequests.FirstOrDefault(x => x.Id == id);

		public Core.Models.RideRequest GetByAsNoTrackingId(Guid id)
			=> _context.RideRequests.AsNoTracking().FirstOrDefault(x => x.Id == id);

		public async Task<IEnumerable<Core.Models.RideRequest>> GetPartAsync(CancellationToken cancellationToken)
			=> await _context.RideRequests.ToListAsync(cancellationToken).ConfigureAwait(false);
	}
}
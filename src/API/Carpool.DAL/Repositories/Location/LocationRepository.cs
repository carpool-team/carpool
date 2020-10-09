using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Location
{
	public class LocationRepository : BaseRepository<Core.Models.Location, Guid>, ILocationRepository
	{
		public LocationRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Core.Models.Location>> GetPartAsync(CancellationToken cancellationToken)
			=> await _context.Locations.ToListAsync(cancellationToken).ConfigureAwait(false);

		public async Task<IEnumerable<Core.Models.Location>> GetPartAsNoTrackingAsync(
			CancellationToken cancellationToken)
			=> await _context.Locations.AsNoTracking().ToListAsync(cancellationToken).ConfigureAwait(false);

		public IEnumerable<Core.Models.Location> GetPart(CancellationToken cancellationToken)
			=> _context.Locations.ToList();

		public IEnumerable<Core.Models.Location> GetPartAsNoTracking(CancellationToken cancellationToken)
			=> _context.Locations.AsNoTracking().ToList();

		public async Task<Core.Models.Location> GetByIdAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.Locations
			                 .FirstOrDefaultAsync(x => x.Id == id, cancellationToken).ConfigureAwait(false);

		public async Task<Core.Models.Location> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.Locations
			                 .FirstOrDefaultAsync(x => x.Id == id, cancellationToken).ConfigureAwait(false);

		public Core.Models.Location GetById(Guid id)
			=> _context.Locations.FirstOrDefault(x => x.Id == id);

		public Core.Models.Location GetByIdAsNoTracking(Guid id)
			=> _context.Locations.AsNoTracking().FirstOrDefault(x => x.Id == id);

		public async Task<Core.Models.Location> GetByCoordsAsync(double longitude,
		                                                         double latitude,
		                                                         CancellationToken cancellationToken)
			=> await _context.Locations.Where(x
				                 => Math.Abs(x.Longitude - longitude) < 0.00001
				                    && Math.Abs(x.Latitude - latitude) < 0.00001)
			                 .FirstOrDefaultAsync(cancellationToken).ConfigureAwait(false);
	}
}
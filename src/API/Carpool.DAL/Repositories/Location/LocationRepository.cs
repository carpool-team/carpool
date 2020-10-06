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

		public async Task<IEnumerable<Core.Models.Location>> GetPartAsNoTrackingAsync(CancellationToken cancellationToken)
			=> await _context.Locations.AsNoTracking().ToListAsync(cancellationToken).ConfigureAwait(false);

		public IEnumerable<Core.Models.Location> GetPart(CancellationToken cancellationToken)
			=> _context.Locations.ToList();

		public IEnumerable<Core.Models.Location> GetPartAsNoTracking(CancellationToken cancellationToken)
			=> _context.Locations.AsNoTracking().ToList();

		public async Task<Core.Models.Location> GetByIdAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.Locations.Include(x => x.Coordinates).FirstOrDefaultAsync(x => x.Id == id,cancellationToken: cancellationToken).ConfigureAwait(false);

		public async Task<Core.Models.Location> GetByIdAsNoTrackingAsync(Guid id, CancellationToken cancellationToken)
			=> await _context.Locations.Include(x => x.Coordinates).FirstOrDefaultAsync(x => x.Id == id,cancellationToken: cancellationToken).ConfigureAwait(false);

		public Core.Models.Location GetById(Guid id)
			=> throw new NotImplementedException();

		public Core.Models.Location GetByIdAsNoTracking(Guid id)
			=> throw new NotImplementedException();
	}
}
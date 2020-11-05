using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories.Rating
{
	public class RatingRepository : BaseRepository<Core.Models.Rating, Guid>, IRatingRepository
	{
		public RatingRepository(CarpoolDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Core.Models.Rating>> GetUserRatingsByUserIdAsNoTrackingAsync(
			Guid userId,
			CancellationToken cancellationToken)
			=> await _context.Ratings.AsNoTracking().Where(x => x.UserId == userId).ToListAsync(cancellationToken)
			                 .ConfigureAwait(false);
	}
}
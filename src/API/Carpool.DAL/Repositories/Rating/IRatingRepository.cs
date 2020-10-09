using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Rating
{
	public interface IRatingRepository : IBaseRepository<Core.Models.Rating, Guid>
	{
		Task<IEnumerable<Core.Models.Rating>> GetUserRatingsByUserIdAsNoTrackingAsync(
			Guid userId,
			CancellationToken cancellationToken);
	}
}
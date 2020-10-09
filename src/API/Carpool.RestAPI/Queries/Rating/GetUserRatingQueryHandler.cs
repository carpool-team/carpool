using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Rating;
using MediatR;

namespace Carpool.RestAPI.Queries.Rating
{
	public class GetUserRatingQueryHandler : IRequestHandler<GetUserRatingQuery, double>
	{
		private readonly IRatingRepository _repository;

		public GetUserRatingQueryHandler(IRatingRepository repository)
		{
			_repository = repository;
		}

		public async Task<double> Handle(GetUserRatingQuery request, CancellationToken cancellationToken)
		{
			var ratings = await _repository.GetUserRatingsByUserIdAsNoTrackingAsync(request.UserId, cancellationToken).ConfigureAwait(false);
			var userRating = ratings.Sum(x => x.Value) / ratings.Count();
			
			return userRating;
		}
	}
}
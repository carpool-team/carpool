using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;

namespace Application.Queries.RatingQueries
{
	public class GetUserRatingQuery : IRequest<double>
	{
		public GetUserRatingQuery(AppUserId appUserId)
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; }
	}
	
	public class GetUserRatingQueryHandler : IRequestHandler<GetUserRatingQuery, double>
	{
		private readonly IUserRepository _repository;

		public GetUserRatingQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<double> Handle(GetUserRatingQuery request, CancellationToken cancellationToken)
		{
			var rating = await _repository.GetUserRatingAsync(request.AppUserId, cancellationToken)
				.ConfigureAwait(false);

			return rating;
		}
	}
}
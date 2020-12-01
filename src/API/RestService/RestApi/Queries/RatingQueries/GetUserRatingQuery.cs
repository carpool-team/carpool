using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Queries.RatingQueries
{
	public class GetUserRatingQuery : IRequest<double>
	{
		public GetUserRatingQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; }
	}
	
	public class GetUserRatingQueryHandler : IRequestHandler<GetUserRatingQuery, double>
	{
		private readonly IUserRepository _repository;

		public GetUserRatingQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<double> Handle(GetUserRatingQuery request, CancellationToken cancellationToken)
		{
			var rating = await _repository.GetUserRatingAsync(request.UserId, cancellationToken)
				.ConfigureAwait(false);

			return rating;
		}
	}
}
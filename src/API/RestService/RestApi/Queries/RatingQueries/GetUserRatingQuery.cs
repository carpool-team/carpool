using System;
using MediatR;

namespace RestApi.Queries.RatingQueries
{
	public class GetUserRatingQuery : IRequest<double>
	{
		public GetUserRatingQuery(Guid userId)
			=> UserId = userId;

		public Guid UserId { get; set; }
	}
}
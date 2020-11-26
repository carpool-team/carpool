using System;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Queries.RatingQueries
{
	public class GetUserRatingQuery : IRequest<double>
	{
		public GetUserRatingQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; set; }
	}
}
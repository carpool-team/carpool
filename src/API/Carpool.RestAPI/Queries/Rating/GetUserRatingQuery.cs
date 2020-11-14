using System;
using MediatR;

namespace Carpool.RestAPI.Queries.Rating
{
	public class GetUserRatingQuery : IRequest<double>
	{
		public GetUserRatingQuery(Guid userId)
			=> UserId = userId;

		public Guid UserId { get; set; }
	}
}
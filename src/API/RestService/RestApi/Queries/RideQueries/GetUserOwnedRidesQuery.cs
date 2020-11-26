using System;
using System.Collections.Generic;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class GetUserOwnedRidesQuery : IRequest<IEnumerable<Ride>>
	{
		public GetUserOwnedRidesQuery(UserId userId, bool past)
		{
			UserId = userId;
			Past = past;
		}

		public UserId UserId { get; set; }
		public bool Past { get; set; }
	}
}
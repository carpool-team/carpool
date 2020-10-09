using System;
using System.Collections;
using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetUserOwnedRidesQuery : IRequest<IEnumerable<Core.Models.Ride>>
	{
		public GetUserOwnedRidesQuery(Guid userId, bool past)
		{
			UserId = userId;
			Past = past;
		}

		public Guid UserId { get; set; }
		public bool Past { get; set; }
	}
}
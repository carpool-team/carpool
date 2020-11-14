using System;
using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetUserParticipatedRidesQuery : IRequest<IEnumerable<Core.Models.Ride>>
	{
		public GetUserParticipatedRidesQuery(Guid userId, bool past)
		{
			UserId = userId;
			Past = past;
		}

		public Guid UserId { get; set; }
		public bool Past { get; set; }
	}
}
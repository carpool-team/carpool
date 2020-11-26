using System;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.RideQueries
{
	public class GetRideQuery : IRequest<Ride>
	{
		[JsonConstructor]
		public GetRideQuery(RideId rideId)
			=> RideId = rideId;

		public RideId RideId { get; set; }
	}
}
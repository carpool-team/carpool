using System;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.RideQueries
{
	public class GetRideQuery : IRequest<Ride>
	{
		[JsonConstructor]
		public GetRideQuery(Guid rideId)
			=> RideId = rideId;

		public Guid RideId { get; set; }
	}
}
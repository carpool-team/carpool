using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetRideQuery : IRequest<Core.Models.Ride>
	{
		[JsonConstructor]
		public GetRideQuery(Guid rideId)
			=> RideId = rideId;

		public Guid RideId { get; set; }
	}
}
using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Ride
{
	public class DeleteRideCommand : IRequest<Core.Models.Ride>
	{
		[JsonConstructor]
		public DeleteRideCommand(Guid rideId)
			=> RideId = rideId;

		public Guid RideId { get; set; }
	}
}
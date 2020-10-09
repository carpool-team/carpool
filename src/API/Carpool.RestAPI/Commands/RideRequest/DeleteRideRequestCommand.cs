using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.RideRequest
{
	public class DeleteRideRequestCommand : IRequest<Core.Models.RideRequest>
	{
		[JsonConstructor]
		public DeleteRideRequestCommand(Guid rideRequestId)
			=> RideRequestId = rideRequestId;

		public Guid RideRequestId { get; set; }
	}
}
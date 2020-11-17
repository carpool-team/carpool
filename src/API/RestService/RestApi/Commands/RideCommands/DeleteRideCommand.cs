using System;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class DeleteRideCommand : IRequest<Ride>
	{
		[JsonConstructor]
		public DeleteRideCommand(Guid rideId)
			=> RideId = rideId;

		public Guid RideId { get; set; }
	}
}
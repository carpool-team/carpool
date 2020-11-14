using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideParticipandCommand : IRequest
	{
		[JsonConstructor]
		public AddRideParticipandCommand(Guid? rideId, Guid participandId)
		{
			RideId = rideId;
			ParticipandId = participandId;
		}

		public Guid? RideId { get; set; }
		public Guid ParticipandId { get; set; }
	}
}
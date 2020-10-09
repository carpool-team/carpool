using System;
using Carpool.Core.Models;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.RideRequest
{
	public class AddRideRequestCommand : IRequest<Core.Models.RideRequest>
	{
		[JsonConstructor]
		public AddRideRequestCommand(Guid? requesterId,
		                             DateTime date,
		                             Core.Models.Location destination,
		                             Guid? destinationId,
		                             Core.Models.Location startingLocation,
		                             Guid? startingLocationId)
		{
			RequesterId = requesterId;
			Date = date;
			Destination = destination;
			DestinationId = destinationId;
			StartingLocation = startingLocation;
			StartingLocationId = startingLocationId;
		}

		public Guid? RequesterId { get; set; }

		public DateTime Date { get; set; }
		public Core.Models.Location Destination { get; set; }
		public Guid? DestinationId { get; set; }
		public Core.Models.Location StartingLocation { get; set; }
		public Guid? StartingLocationId { get; set; }
	}
}
using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.RideRequest
{
	public class UpdateRideRequestCommand : IRequest
	{
		[JsonConstructor]
		public UpdateRideRequestCommand(Core.Models.Location destination,
		                                Guid? destinationId,
		                                Guid? startingLocationId,
		                                Guid? requesterId,
		                                DateTime? date,
		                                Guid? rideRequestId,
		                                Core.Models.Location startingLocation)
		{
			Destination = destination;
			DestinationId = destinationId;
			StartingLocationId = startingLocationId;
			RequesterId = requesterId;
			Date = date;
			RideRequestId = rideRequestId;
			StartingLocation = startingLocation;
		}

		public Guid? RideRequestId { get; set; }
		public Core.Models.Location Destination { get; set; }
		public Guid? DestinationId { get; set; }
		public Core.Models.Location StartingLocation { get; set; }
		public Guid? StartingLocationId { get; set; }
		public Guid? RequesterId { get; set; }

		public DateTime? Date { get; set; }
	}
}
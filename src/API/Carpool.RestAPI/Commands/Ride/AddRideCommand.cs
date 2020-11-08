using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideCommand : IRequest<Core.Models.Ride>
	{
		[JsonConstructor]
		public AddRideCommand(Guid ownerId, List<Guid> participantsIds, Guid groupId, DateTime date, double price, Guid? startingLocationId, double? startingLocationLongitude, double? startingLocationLatitude, Guid? destinationId, double? destinationLongitude, double? destinationLatitude)
		{
			OwnerId = ownerId;
			ParticipantsIds = participantsIds;
			GroupId = groupId;
			Date = date;
			Date = date;
			Price = price;
			StartingLocationId = startingLocationId;
			StartingLocationLongitude = startingLocationLongitude;
			StartingLocationLatitude = startingLocationLatitude;
			DestinationId = destinationId;
			DestinationLongitude = destinationLongitude;
			DestinationLatitude = destinationLatitude;
		}

		public Guid OwnerId { get; set; }
		public List<Guid> ParticipantsIds { get; set; }

		public Guid GroupId { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
		
		public Guid? DestinationId { get; set; }
		public double? DestinationLongitude { get; set; }
		public double? DestinationLatitude { get; set; }

		public Guid? StartingLocationId { get; set; }
		public double? StartingLocationLongitude { get; set; }
		public double? StartingLocationLatitude { get; set; }
	}
}
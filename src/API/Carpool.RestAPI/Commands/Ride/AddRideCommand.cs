using System;
using System.Collections.Generic;
using Carpool.Core.ValueObjects;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideCommand : IRequest<Core.Models.Ride>
	{
		[JsonConstructor]
		public AddRideCommand(Guid ownerId, List<Guid> participantsIds, Guid groupId, DateTime date, double price, Location destination, Location startingLocation)
			=> (OwnerId, ParticipantsIds, GroupId, Date, Price, Destination, StartingLocation) = (ownerId, participantsIds, groupId, date, price, destination, startingLocation);

		public Guid OwnerId { get; set; }
		public List<Guid> ParticipantsIds { get; set; }

		public Guid GroupId { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
		
		public Location Destination { get; set; }

		public Location StartingLocation { get; set; }
	}
}
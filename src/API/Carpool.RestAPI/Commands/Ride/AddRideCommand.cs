using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Ride
{
	public class AddRideCommand : IRequest<Core.Models.Ride>
	{
		[JsonConstructor]
		public AddRideCommand(Guid ownerId, List<Guid> participantsIds, Guid groupId, DateTime date, double price)
		{
			OwnerId = ownerId;
			ParticipantsIds = participantsIds;
			GroupId = groupId;
			Date = date;
			Price = price;
		}

		public Guid OwnerId { get; set; }
		public List<Guid> ParticipantsIds { get; set; }

		public Guid GroupId { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
	}
}
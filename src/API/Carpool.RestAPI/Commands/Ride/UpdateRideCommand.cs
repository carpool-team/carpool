using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Ride
{
	public class UpdateRideCommand : IRequest<Core.Models.Ride>
	{
		[JsonConstructor]
		public UpdateRideCommand(List<Guid> participantIds, DateTime? date, double? price)
		{
			ParticipantIds = participantIds;
			Date = date;
			Price = price;
		}

		public Guid? RideId { get; set; }
		public List<Guid> ParticipantIds { get; set; }

		public DateTime? Date { get; set; }

		public double? Price { get; set; }
	}
}
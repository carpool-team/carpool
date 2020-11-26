using System;
using System.Collections.Generic;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class UpdateRideCommand : IRequest<Ride>
	{
		[JsonConstructor]
		public UpdateRideCommand(List<Guid> participantIds, DateTime? date, double? price)
		{
			ParticipantIds = participantIds;
			Date = date;
			Price = price;
		}

		public RideId? RideId { get; set; }
		public List<Guid> ParticipantIds { get; set; }

		public DateTime? Date { get; set; }

		public double? Price { get; set; }
	}
}
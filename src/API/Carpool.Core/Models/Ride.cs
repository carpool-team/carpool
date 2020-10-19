using System;
using System.Collections.Generic;
using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;

namespace Carpool.Core.Models
{
	public class Ride : Route
	{
		public Guid OwnerId { get; set; }

		public List<UserParticipatedRide> Participants { get; set; }

		public Guid GroupId { get; set; }

		public List<Stop> Stops { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
	}
}
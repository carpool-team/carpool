using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Ride : Route
	{
		public User Owner { get; set; }
		public List<UserParticipatedRide> Participants { get; set; }

		public Guid GroupId { get; set; }
		public Group Group { get; set; }

		public List<Stop> Stops { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
	}
}
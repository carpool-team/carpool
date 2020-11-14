using System;
using System.Collections.Generic;
using Carpool.Core.Abstract;
using Carpool.Core.Models.Intersections;

namespace Carpool.Core.Models
{
	public class Ride : Route
	{
		public Guid OwnerId { get; set; }
        public User Owner { get; set; }

		public List<UserParticipatedRide> Participants { get; set; }

		public Guid GroupId { get; set; }

        public Group Group { get; set; }

        public DateTime Date { get; set; }

		public double Price { get; set; }
	}
}
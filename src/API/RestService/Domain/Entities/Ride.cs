using System;
using System.Collections.Generic;
using Domain.Abstract;
using Domain.Entities.Intersections;

namespace Domain.Entities
{
	public class Ride : Route
	{
		public Guid OwnerId { get; set; }
		public ApplicationUser Owner { get; set; }

		public List<UserParticipatedRide> Participants { get; set; }

		public Guid GroupId { get; set; }

		public Group Group { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
	}
}
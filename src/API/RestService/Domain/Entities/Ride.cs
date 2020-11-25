using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstract;
using Domain.Entities.Intersections;
using Domain.ValueObjects;

namespace Domain.Entities
{
	public class Ride : BaseEntity<Guid>
	{
		public Guid OwnerId { get; set; }
		public ApplicationUser Owner { get; set; }

		public List<UserParticipatedRide> Participants { get; set; }

		public Guid GroupId { get; set; }

		public Group Group { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
		
		[ForeignKey("DestinationId")] public Location Destination { get; set; }

		public Guid DestinationId { get; set; }

		[ForeignKey("StartingLocationId")] public Location StartingLocation { get; set; }

		public Guid StartingLocationId { get; set; }

		public List<Stop> Stops { get; set; }
	}
}
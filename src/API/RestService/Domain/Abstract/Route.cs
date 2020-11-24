using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities;
using Domain.ValueObjects;

namespace Domain.Abstract
{
	public abstract class Route : BaseEntity<Guid>
	{
		[ForeignKey("DestinationId")] public Location Destination { get; set; }

		public Guid DestinationId { get; set; }

		[ForeignKey("StartingLocationId")] public Location StartingLocation { get; set; }

		public Guid StartingLocationId { get; set; }

		public List<Stop> Stops { get; set; }
	}
}
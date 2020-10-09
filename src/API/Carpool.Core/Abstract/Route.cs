using System;
using Carpool.Core.Models;

namespace Carpool.Core.Abstract
{
	public abstract class Route : BaseEntity<Guid>
	{
		public Location Destination { get; set; }
		public Guid DestinationId { get; set; }
		public Location StartingLocation { get; set; }
		public Guid StartingLocationId { get; set; }
	}
}
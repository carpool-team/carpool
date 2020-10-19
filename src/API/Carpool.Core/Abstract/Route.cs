using System;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.Core.Models;

namespace Carpool.Core.Abstract
{
	public abstract class Route : BaseEntity<Guid>
	{
		[ForeignKey("DestinationId")]
		public Location Destination { get; set; }
		public Guid DestinationId { get; set; }

        [ForeignKey("StartingLocationId")]
        public Location StartingLocation { get; set; }
		public Guid StartingLocationId { get; set; }
	}
}
using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Stop : BaseEntity<Guid>
	{
        public Guid UserId { get; set; }
		public User User { get; set; }
		public Location Location { get; set; }
		public Guid LocationId { get; set; }
		public Ride Ride { get; set; }
		public Guid RideId { get; set; }
	}
}
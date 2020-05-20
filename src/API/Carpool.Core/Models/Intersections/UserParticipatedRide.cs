using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models.Intersections
{
	public class UserParticipatedRide
	{
		public Guid UserId { get; set; }
		public User User { get; set; }

		public Guid RideId { get; set; }
		public Ride Ride { get; set; }
	}
}
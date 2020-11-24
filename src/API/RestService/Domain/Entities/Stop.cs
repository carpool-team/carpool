using System;
using Domain.Abstract;
using Domain.ValueObjects;

namespace Domain.Entities
{
	public class Stop : BaseEntity<Guid>
	{
		public Guid UserId { get; set; }
		public Guid LocationId { get; set; }
		public Location Location { get; set; }
		public Guid RideId { get; set; }
	}
}
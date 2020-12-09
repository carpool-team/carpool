using System;
using Domain.Abstract;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class Stop : BaseEntity<StopId>
	{
		public Guid UserId { get; set; }
		public Location Location { get; set; }
		public RideId RideId { get; set; }
	}
}
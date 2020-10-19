using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Stop : BaseEntity<Guid>
	{
		public Guid UserId { get; set; }
		public Guid LocationId { get; set; }
		public Guid RideId { get; set; }
	}
}
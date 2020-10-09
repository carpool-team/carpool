using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Vehicle : BaseEntity<Guid>
	{
		public string Name { get; set; }
		public User Owner { get; set; }
		public Guid OwnerId { get; set; }
	}
}
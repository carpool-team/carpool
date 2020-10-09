using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Rating : BaseEntity<Guid>
	{
		public User User { get; set; }
		public Guid UserId { get; set; }
		public int Value { get; set; }
	}
}
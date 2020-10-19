using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Rating : BaseEntity<Guid>
	{
		public Guid UserId { get; set; }
		public byte Value { get; set; }
	}
}
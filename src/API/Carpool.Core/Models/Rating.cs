using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Rating : BaseEntity<Guid>
	{
		public User User { get; set; }
		public Guid UserId { get; set; }
		public int Value { get; set; }
	}
}
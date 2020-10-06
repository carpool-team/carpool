using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Vehicle : BaseEntity<Guid>
	{
		public string Name { get; set; }
		public User Owner { get; set; }
		public Guid OwnerId { get; set; }
	}
}
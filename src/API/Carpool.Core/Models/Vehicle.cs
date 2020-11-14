using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Vehicle : BaseEntity<Guid>
	{
		public string Name { get; set; }
	}
}
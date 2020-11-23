using System;
using Domain.Abstract;

namespace Domain.Entities
{
	public class Vehicle : BaseEntity<Guid>
	{
		public string Name { get; set; }
	}
}
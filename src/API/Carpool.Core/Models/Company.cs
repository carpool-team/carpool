using System;
using System.Collections.Generic;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Company : BaseEntity<int>
	{
		public string Name { get; set; }
		public List<User> Users { get; set; }
	}
}
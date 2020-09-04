using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Rating : BaseEntity
	{
		public int Value { get; set; }
	}
}
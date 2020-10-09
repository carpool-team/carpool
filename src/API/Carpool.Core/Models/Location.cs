using System;
using System.ComponentModel.DataAnnotations;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Location : BaseEntity<Guid>
	{
		[Required] public double Longitude { get; set; }

		[Required] public double Latitude { get; set; }

		public string Name { get; set; }
	}
}
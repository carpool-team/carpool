using System;
using System.ComponentModel.DataAnnotations;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class Location : BaseEntity<Guid>
	{
		public Location()
		{
		}

		public Location(double longitude, double latitude)
		{
			Longitude = longitude;
			Latitude = latitude;
		}

		[Required] public double Longitude { get; set; }

		[Required] public double Latitude { get; set; }

		public string Name { get; set; }
	}
}
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Core.DTOs.LocationDTOs
{
	public class CoordinatesDTO
	{
		public double Latitude { get; set; }
		public double Longitute { get; set; }

		public static CoordinatesDTO FromCoordinates(Coordinates coordinates)
		{
			return new CoordinatesDTO()
			{
				Latitude = coordinates.Latitude,
				Longitute = coordinates.Longitude
			};
		}
	}
}
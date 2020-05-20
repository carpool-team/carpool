using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Core.DTOs.LocationDTOs
{
	public class LocationDTO
	{
		public CoordinatesDTO Coordinates { get; set; }
		public string Name { get; set; }

		public static LocationDTO FromLocation(Location location)
		{
			return new LocationDTO()
			{
				Coordinates = CoordinatesDTO.FromCoordinates(location.Coordinates),
				Name = location.LocationName.Name
			};
		}
	}
}
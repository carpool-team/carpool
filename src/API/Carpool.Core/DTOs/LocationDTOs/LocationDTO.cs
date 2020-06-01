using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Core.DTOs.LocationDTOs
{
	public class LocationDTO
	{
		[Required]
		public CoordinatesDTO Coordinates { get; set; }

		[Required]
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
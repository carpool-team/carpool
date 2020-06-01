using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Core.DTOs.LocationDTOs
{
	public class CoordinatesDTO
	{
		[Required]
		public double Latitude { get; set; }

		[Required]
		public double Longitude { get; set; }

		public static CoordinatesDTO FromCoordinates(Coordinates coordinates)
		{
			return new CoordinatesDTO()
			{
				Latitude = coordinates.Latitude,
				Longitude = coordinates.Longitude
			};
		}
	}
}
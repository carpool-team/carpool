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
	}
}
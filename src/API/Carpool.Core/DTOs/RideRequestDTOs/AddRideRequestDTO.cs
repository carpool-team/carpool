using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.RideRequestDTOs
{
	public class AddRideRequestDTO
	{
		public Guid RequesterId { get; set; }

		public Location Destination { get; set; }

		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }

		private AddRideRequestDTO()
		{
		}

		public static AddRideRequestDTO GetEmpty()
		{
			return new AddRideRequestDTO()
			{
				RequesterId = new Guid(),
				Destination = new Location()
				{
					Coordinates = new Coordinates(),
					LocationName = new LocationName(),
				},
				StartingLocation = new Location()
				{
					Coordinates = new Coordinates(),
					LocationName = new LocationName(),
				},
				Date = DateTime.Now
			};
		}
	}
}
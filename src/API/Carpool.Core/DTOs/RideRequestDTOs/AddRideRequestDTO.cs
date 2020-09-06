using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.RideRequestDTOs
{
	public class AddRideRequestDTO
	{
		[Required]
		public Location Destination { get; set; }

		[Required]
		public Location StartingLocation { get; set; }

		[Required]
		public DateTime Date { get; set; }

		private AddRideRequestDTO()
		{
		}

		public static AddRideRequestDTO GetEmpty()
		{
			return new AddRideRequestDTO()
			{
				Destination = new Location()
				{
					Coordinates = new Coordinates(),
				},
				StartingLocation = new Location()
				{
					Coordinates = new Coordinates(),
				},
				Date = DateTime.Now
			};
		}
	}
}
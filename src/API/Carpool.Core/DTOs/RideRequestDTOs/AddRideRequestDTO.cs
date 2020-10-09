using System;
using System.ComponentModel.DataAnnotations;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.RideRequestDTOs
{
	public class AddRideRequestDTO
	{
		private AddRideRequestDTO()
		{
		}

		[Required] public Location Destination { get; set; }

		[Required] public Location StartingLocation { get; set; }

		[Required] public DateTime Date { get; set; }

		public static AddRideRequestDTO GetEmpty()
			=> new AddRideRequestDTO
			{
				Destination = new Location(),
				StartingLocation = new Location(),
				Date = DateTime.Now
			};
	}
}
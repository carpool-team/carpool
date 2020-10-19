using System;
using Carpool.Core.Models;
using Carpool.RestAPI.DTOs.UserDTOs;

namespace Carpool.RestAPI.DTOs.RideRequestDTOs
{
	public class IndexRideRequestDTO
	{
		private IndexRideRequestDTO()
		{
		}

		public IndexUserDto Requester { get; set; }

		public Location Destination { get; set; }

		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }
	}
}
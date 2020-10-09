using System;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.RideRequestDTOs
{
	public class IndexRideRequestDTO
	{
		private IndexRideRequestDTO()
		{
		}

		public IndexUserDTO Requester { get; set; }

		public Location Destination { get; set; }

		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }

		public static IndexRideRequestDTO GetFromRide(RideRequest rideRequest)
			=> new IndexRideRequestDTO
			{
				Requester = IndexUserDTO.FromUser(rideRequest.Requester),
				Destination = rideRequest.Destination,
				StartingLocation = rideRequest.StartingLocation,
				Date = rideRequest.Date
			};
	}
}
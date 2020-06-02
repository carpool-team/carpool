using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.RideRequestDTOs
{
	public class IndexRideRequestDTO
	{
		public IndexUserDTO Requester { get; set; }

		public Location Destination { get; set; }

		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }

		private IndexRideRequestDTO()
		{
		}

		public static IndexRideRequestDTO GetFromRide(RideRequest rideRequest)
		{
			return new IndexRideRequestDTO()
			{
				Requester = IndexUserDTO.FromUser(rideRequest.Requester),
				Destination = rideRequest.Destination,
				StartingLocation = rideRequest.StartingLocation,
				Date = rideRequest.Date,
			};
		}
	}
}
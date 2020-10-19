using System;
using System.Collections.Generic;
using Carpool.Core.Models;
using Carpool.RestAPI.DTOs.StopDTOs;
using Carpool.RestAPI.DTOs.UserDTOs;

namespace Carpool.RestAPI.DTOs.RideDTOs
{
	public class IndexRideDTO
	{
		public IndexRideDTO(Guid rideId, IndexUserDto owner, List<IndexUserDto> participants, List<IndexStopDTO> stops, Location destination, Location startingLocation, DateTime date, bool isUserParticipant)
		{
			RideId = rideId;
			Owner = owner;
			Participants = participants;
			Stops = stops;
			Destination = destination;
			StartingLocation = startingLocation;
			Date = date;
			IsUserParticipant = isUserParticipant;
		}

		private IndexRideDTO()
		{
		}

		public Guid RideId { get; set; }
		public IndexUserDto Owner { get; set; }
		public List<IndexUserDto> Participants { get; set; }

		public List<IndexStopDTO> Stops { get; set; }

		public Location Destination { get; set; }
		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }

		public bool IsUserParticipant { get; set; }
	}
}
using System;
using System.Collections.Generic;
using Carpool.Core.ValueObjects;
using Carpool.RestAPI.DTOs.Stop;
using Carpool.RestAPI.DTOs.User;

namespace Carpool.RestAPI.DTOs.Ride
{
    public class IndexRideDTO
	{
		public IndexRideDTO(Guid rideId,
		                    IndexUserDto owner,
		                    List<IndexUserDto> participants,
		                    List<IndexStopDTO> stops,
		                    Location destination,
		                    Location startingLocation,
		                    DateTime date,
		                    bool isUserParticipant)
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
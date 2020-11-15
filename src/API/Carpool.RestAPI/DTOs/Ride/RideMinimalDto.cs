using System;
using Carpool.Core.ValueObjects;

namespace Carpool.RestAPI.DTOs.Ride
{
    public class RideMinimalDto
	{
		public RideMinimalDto(Guid rideId, bool isUserParticipant, DateTime date, Location destination) : this(rideId,
			date, destination)
		{
			IsUserParticipant = isUserParticipant;
			IsUserParticipant = isUserParticipant;
		}

		public RideMinimalDto(Guid rideId, DateTime date, Location destination)
		{
			RideId = rideId;
			Date = date;
			Destination = destination;
		}

		public Guid RideId { get; set; }
		public bool? IsUserParticipant { get; set; }
		public DateTime Date { get; set; }
		public Location Destination { get; set; }
	}
}
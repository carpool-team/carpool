using System;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace DataTransferObjects.Ride
{
    public class RideMinimalDto
    {
        public RideMinimalDto(RideId rideId, bool isUserParticipant, DateTimeOffset date, Location destination) : this(rideId,
            date, destination)
        {
            IsUserParticipant = isUserParticipant;
            IsUserParticipant = isUserParticipant;
        }

        public RideMinimalDto(RideId rideId, DateTimeOffset date, Location destination)
        {
            RideId = rideId;
            Date = date;
            Destination = new LocationDto(destination.Longitude, destination.Latitude);
        }

        public RideId RideId { get; set; }
        public bool? IsUserParticipant { get; set; }
        public DateTimeOffset Date { get; set; }
        public LocationDto Destination { get; set; }
    }
}
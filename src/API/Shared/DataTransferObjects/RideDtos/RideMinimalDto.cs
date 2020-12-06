using DataTransferObjects;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using System;

namespace RestApi.DTOs.Ride
{
    public class RideMinimalDto
    {
        public RideMinimalDto(RideId rideId, bool isUserParticipant, DateTime date, Location destination) : this(rideId,
            date, destination)
        {
            IsUserParticipant = isUserParticipant;
            IsUserParticipant = isUserParticipant;
        }

        public RideMinimalDto(RideId rideId, DateTime date, Location destination)
        {
            RideId = rideId;
            Date = date;
            Destination = new LocationDto(destination.Longitude, destination.Latitude);
        }

        public RideId RideId { get; set; }
        public bool? IsUserParticipant { get; set; }
        public DateTime Date { get; set; }
        public LocationDto Destination { get; set; }
    }
}
#nullable enable
using System;
using System.Collections.Generic;
using DataTransferObjects.Group;
using DataTransferObjects.Stop;
using DataTransferObjects.User;
using Domain.Enums;
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects.Ride
{
    public record UpdateRideDto([property: JsonProperty("participantIds")] List<long> ParticipantIds,
        [property: JsonProperty("date")] DateTimeOffset? Date,
        [property: JsonProperty("price")] double? Price);

	public record RideDto([property: JsonProperty("owner")] RideOwnerDto RideOwner,
		[property: JsonProperty("group")]GroupDto Group,
		[property: JsonProperty("location")]LocationDto Location,
		[JsonProperty("price")]double Price,
		[JsonProperty("rideDirection")]RideDirection RideDirection,
		[JsonProperty("stops")]List<StopDto> Stops,
		[JsonProperty("rideDate")]DateTimeOffset RideDate,
		[JsonProperty("rideId")]RideId RideId,
		[JsonProperty("seatsLimit")]byte SeatsLimit,
		[JsonProperty("recurringRideId")]RecurringRideId? RecurringRideId);

	public record RideRequestRideDto([JsonProperty("rideId")] RideId Id,
		[JsonProperty("date")] DateTimeOffset Date,
		[JsonProperty("location")] LocationDto Location,
		[JsonProperty("group")] MinimalGroupDto Group,
		[JsonProperty("rideDirection")] RideDirection RideDirection,
		[JsonProperty("stops")]List<StopDto> Stops);
}
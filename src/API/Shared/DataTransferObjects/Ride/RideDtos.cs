#nullable enable
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using Domain.Enums;
using IdentifiersShared.Identifiers;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;

namespace RestApi.DTOs.Ride
{
    public record UpdateRideDto([property: JsonProperty("participantIds")] List<long> ParticipantIds,
        [property: JsonProperty("date")] DateTime? Date,
        [property: JsonProperty("price")] double? Price);

	public record RideDto([property: JsonProperty("owner")] RideOwnerDto RideOwner,
		[property: JsonProperty("group")]GroupDto Group,
		[property: JsonProperty("location")]LocationDto Location,
		[JsonProperty("price")]double Price,
		[JsonProperty("rideDirection")]RideDirection RideDirection,
		[JsonProperty("stops")]List<StopDto> Stops,
		[JsonProperty("rideDate")]DateTime RideDate,
		[JsonProperty("rideId")]RideId RideId,
		[JsonProperty("seatsLimit")]byte SeatsLimit,
		[JsonProperty("recurringRideId")]RecurringRideId? RecurringRideId);

	public record RideRequestRideDto([JsonProperty("rideId")] RideId Id,
		[JsonProperty("date")] DateTime Date,
		[JsonProperty("location")] LocationDto Location,
		[JsonProperty("group")] MinimalGroupDto Group,
		[JsonProperty("rideDirection")] RideDirection RideDirection);
}
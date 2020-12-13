using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using Domain.Enums;
using IdentifiersShared.Identifiers;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;
using RestApi.DTOs.Vehicle;

namespace RestApi.DTOs.Ride
{
    public record UpdateRideDto([property: JsonProperty("participantIds")] List<long> ParticipantIds,
        [property: JsonProperty("date")] DateTime? Date,
        [property: JsonProperty("price")] double? Price);

	public record RideDto([property: JsonProperty("owner")] OwnerDto Owner,
		[property: JsonProperty("group")]GroupDto Group,
		[property: JsonProperty("location")]LocationDto Location,
		[JsonProperty("price")]double Price,
		[JsonProperty("rideDirection")]RideDirection RideDirection,
		[JsonProperty("stops")]List<StopDto> stops,
		[JsonProperty("rideDate")]DateTime RideDate,
		[JsonProperty("rideId")]RideId RideId,
		[JsonProperty("seatsLimit")]byte SeatsLimit);
}
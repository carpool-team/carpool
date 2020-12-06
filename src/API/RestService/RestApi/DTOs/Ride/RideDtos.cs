using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace RestApi.DTOs.Ride
{
	public record UpdateRideDto([property: JsonProperty("participantIds")] List<long> ParticipantIds,
		[property: JsonProperty("date")] DateTime? Date,
		[property: JsonProperty("price")] double? Price);
}
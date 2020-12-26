using DataTransferObjects;
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace RestApi.DTOs.Stop
{
	public record StopDto([JsonProperty("location")] LocationDto Location,
	                      [JsonProperty("participant")]ParticipantDto Participant);

	public record AddStopDto([JsonProperty("location")] LocationDto Location,
	                         [JsonProperty("participantId")] AppUserId ParticipantId);

}
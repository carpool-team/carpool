using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects
{
	public record ParticipantDto([JsonProperty("participantId")] AppUserId ParticipantId,
	                                 [JsonProperty("firstName")] string FirstName,
	                                 [JsonProperty("lastName")] string LastName);
}
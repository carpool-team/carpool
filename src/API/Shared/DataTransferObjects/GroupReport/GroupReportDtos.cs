using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects.GroupReport
{
	public record GroupReportDto([JsonProperty("userCount")] int UserCount,
		[property: JsonProperty("groupId")] GroupId GroupId,
		[JsonProperty("location")] LocationDto Location,
		[JsonProperty("ownerId")] AppUserId OwnerId,
		[JsonProperty("name")] string Name);
}
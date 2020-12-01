using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace RestApi.DTOs.Group
{
	public record UpdateGroupDto([property: JsonProperty("location")] Location Location,
		[property: JsonProperty("name")] string Name,
		[property: JsonProperty("code")] string Code,
		[property: JsonProperty("ownerId")] UserId OwnerId);

	public record ChangeGroupLocationDto([property: JsonProperty("longitude")] double Longitude,
		[property: JsonProperty("latitude")] double Latitude,
		[property: JsonProperty("groupId")] GroupId GroupId);
}
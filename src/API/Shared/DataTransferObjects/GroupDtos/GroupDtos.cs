using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects.GroupDtos
{
    public record UpdateGroupDto([property: JsonProperty("location")] LocationDto Location,
        [property: JsonProperty("name")] string Name,
        [property: JsonProperty("code")] string Code,
        [property: JsonProperty("ownerId")] AppUserId OwnerId);

    public record ChangeGroupLocationDto([property: JsonProperty("longitude")] double Longitude,
        [property: JsonProperty("latitude")] double Latitude,
        [property: JsonProperty("groupId")] GroupId GroupId);

    public record GroupDto([JsonProperty("userCount")] int UserCount,
        [JsonProperty("groupId")] GroupId GroupId,
        [JsonProperty("location")] LocationDto Location,
        [JsonProperty("name")] string Name);
}
using Newtonsoft.Json;

namespace DataTransferObjects.GroupInvitesDtos
{
    public record UpdateGroupInviteDto([property: JsonProperty("isAccepted")] bool IsAccepted);
}
using Newtonsoft.Json;

namespace RestApi.DTOs.GroupInvites
{
	public record UpdateGroupInviteDto([property:JsonProperty("isAccepted")]bool IsAccepted);
}
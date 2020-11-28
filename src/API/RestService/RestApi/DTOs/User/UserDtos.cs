using Newtonsoft.Json;

namespace RestApi.DTOs.User
{
	public record UpdateUserDto([property: JsonProperty("firstName")] string FirstName,
		[property: JsonProperty("lastName")] string LastName);

}
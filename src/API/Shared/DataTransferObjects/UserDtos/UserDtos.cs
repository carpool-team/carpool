using Newtonsoft.Json;

namespace RestApi.DTOs.User
{
    public record UpdateUserDto([property: JsonProperty("firstName")] string FirstName,
        [property: JsonProperty("lastName")] string LastName);

    public record AddUserDto([property: JsonProperty("appUserId")]long appUserId, 
        [property: JsonProperty("firstName")]string firstName,
        [property: JsonProperty("lastName")]string lastName,
        [property: JsonProperty("email")]string email);

}
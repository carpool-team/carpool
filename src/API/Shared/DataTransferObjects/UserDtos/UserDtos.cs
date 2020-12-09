#nullable enable
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;
using RestApi.DTOs.Vehicle;

namespace RestApi.DTOs.User
{
    public record UpdateUserDto([property: JsonProperty("firstName")] string FirstName,
        [property: JsonProperty("lastName")] string LastName);

    public record AddUserDto([property: JsonProperty("appUserId")]long appUserId, 
        [property: JsonProperty("firstName")]string firstName,
        [property: JsonProperty("lastName")]string lastName,
        [property: JsonProperty("email")]string email);

    public record OwnerDto([JsonProperty("rating")] double Rating,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")]string LastName,
        [JsonProperty("id")] AppUserId Id,
        [JsonProperty("vehicle")]IndexVehicleDto? Vehicle);
}
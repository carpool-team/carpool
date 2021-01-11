#nullable enable
using DataTransferObjects.Vehicle;
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects.User
{
    public record UpdateUserDto([property: JsonProperty("firstName")] string FirstName,
        [property: JsonProperty("lastName")] string LastName,
        [JsonProperty("email")] string Email);

    public record AddUserDto([property: JsonProperty("id")]AppUserId AppUserId, 
        [property: JsonProperty("firstName")]string FirstName,
        [property: JsonProperty("lastName")]string LastName,
        [property: JsonProperty("email")]string Email);

    public record RideOwnerDto([JsonProperty("rating")] double Rating,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")]string LastName,
        [JsonProperty("id")] AppUserId Id);

    public record InvitingUserDto([JsonProperty("id")] AppUserId AppUserId,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")] string LastName);
    
    public record InvitedUserDto([JsonProperty("id")] AppUserId AppUserId,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")] string LastName);

    public record UserGroupInviteDto([JsonProperty("id")] AppUserId AppUserId,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")] string LastName,
        [JsonProperty("email")] string Email);

    public record UserSettingsDto([JsonProperty("id")] AppUserId AppUserId,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")] string LastName,
        [JsonProperty("vehicle")] IndexVehicleDto Vehicle);

    public record RideRequestingUserDto([JsonProperty("id")] AppUserId AppUserId,
        [JsonProperty("firstName")] string FirstName,
        [JsonProperty("lastName")] string LastName);
}
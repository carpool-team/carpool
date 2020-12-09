using Newtonsoft.Json;

namespace RestApi.DTOs.Rating
{
    public record AddUserRatingDto([property: JsonProperty("value")] byte Value);
}
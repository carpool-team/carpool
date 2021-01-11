using Newtonsoft.Json;

namespace DataTransferObjects.Rating
{
    public record AddUserRatingDto([property: JsonProperty("value")] byte Value);
}
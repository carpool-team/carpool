using DataTransferObjects;
using Newtonsoft.Json;

namespace RestApi.DTOs.Stop
{
	public record StopDto([JsonProperty("location")] LocationDto Location);
}
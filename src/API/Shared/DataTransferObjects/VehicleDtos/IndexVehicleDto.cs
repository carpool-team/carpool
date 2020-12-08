using Newtonsoft.Json;

namespace RestApi.DTOs.Vehicle
{
    public record IndexVehicleDto([JsonProperty("Name")]string Name);

}
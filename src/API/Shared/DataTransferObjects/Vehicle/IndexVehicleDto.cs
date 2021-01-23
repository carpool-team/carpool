using Newtonsoft.Json;

namespace DataTransferObjects.Vehicle
{
    public record IndexVehicleDto([JsonProperty("Name")]string Name);

}
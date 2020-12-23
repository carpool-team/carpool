using Newtonsoft.Json;

namespace DataTransferObjects.VehicleDtos
{
    public record IndexVehicleDto([JsonProperty("Name")]string Name);

}
namespace Carpool.RestAPI.DTOs.Vehicle
{
	public class IndexVehicleDto
	{
		public IndexVehicleDto(string name)
		{
			Name = name;
		}

		public string Name { get; set; }
	}
}
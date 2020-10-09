using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Location
{
	public class AddLocationCommand : IRequest<Core.Models.Location>
	{
		[JsonConstructor]
		public AddLocationCommand(string name, double longitude, double latitude)
		{
			Name = name;
			Longitude = longitude;
			Latitude = latitude;
		}


		public double Longitude { get; set; }
		public double Latitude { get; set; }
		public string Name { get; set; }
	}
}
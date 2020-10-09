using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Location
{
	public class UpdateLocationCommand : IRequest
	{
		[JsonConstructor]
		public UpdateLocationCommand(Guid? id, string name, double longitude, double latitude)
		{
			Id = id;
			Name = name;
			Longitude = longitude;
			Latitude = latitude;
		}


		public Guid? Id { get; set; }
		public double? Longitude { get; set; }
		public double? Latitude { get; set; }
		public string Name { get; set; }
	}
}
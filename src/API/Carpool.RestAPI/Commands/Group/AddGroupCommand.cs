using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddGroupCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public AddGroupCommand(string name, string code, Guid ownerId, double? longitude, double? latitude)
		{
			Name = name;
			Code = code;
			OwnerId = ownerId;
			Longitude = longitude;
			Latitude = latitude;
		}

		[Required] public string Name { get; set; }

		public string Code { get; set; }

		[Required] public Guid OwnerId { get; set; }

		[Required] public double? Longitude { get; set; }
		[Required] public double? Latitude { get; set; }
	}
}
using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
	public class ChangeGroupLocationCommand : IRequest
	{
		[JsonConstructor]
		public ChangeGroupLocationCommand(Guid? locationId)
			=> LocationId = locationId;

		public Guid? LocationId { get; set; }
		public double? Longitude { get; set; }
		public double? Latitude { get; set; }
		public Guid GroupId { get; set; }
	}
}
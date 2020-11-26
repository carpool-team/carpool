using System;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class ChangeGroupLocationCommand : IRequest
	{
		[JsonConstructor]
		public ChangeGroupLocationCommand(double longitude, double latitude)
			=> (Longitude, Latitude) = (longitude, latitude);

		public double Longitude { get; }
		public double Latitude { get; }
		public GroupId GroupId { get; set; }
	}
}
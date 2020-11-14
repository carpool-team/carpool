using System;
using System.ComponentModel.DataAnnotations;
using Carpool.Core.ValueObjects;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddGroupCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public AddGroupCommand(string name, string code, Guid ownerId, Location location) => (Name, Code, OwnerId, Location) = (name, code, ownerId, location);


		[Required] public string Name { get; init; }

		public string Code { get; init; }

		public Guid OwnerId { get; init; }

		public Location Location { get; init; }
	}
}
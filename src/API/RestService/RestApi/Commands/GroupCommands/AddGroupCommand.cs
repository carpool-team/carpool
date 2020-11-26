using System;
using System.ComponentModel.DataAnnotations;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class AddGroupCommand : IRequest<GroupId>
	{
		[JsonConstructor]
		public AddGroupCommand(string name, string code, UserId ownerId, Location location)
			=> (Name, Code, OwnerId, Location) = (name, code, ownerId, location);


		[Required] public string Name { get; init; }

		public string Code { get; init; }

		public UserId OwnerId { get; init; }

		public Location Location { get; init; }
	}
}
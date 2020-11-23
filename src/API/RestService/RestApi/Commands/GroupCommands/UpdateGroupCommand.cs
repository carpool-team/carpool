using System;
using Domain.ValueObjects;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class UpdateGroupCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public UpdateGroupCommand(Guid id, Location? location, string name, string code, Guid? ownerId)
		{
			Id = id;
			Location = location;
			Name = name;
			Code = code;
			OwnerId = ownerId;
		}

		public Guid Id { get; set; }

		public Location? Location { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }

		public Guid? OwnerId { get; set; }
	}
}
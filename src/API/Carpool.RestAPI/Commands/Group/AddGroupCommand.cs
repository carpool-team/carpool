using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddGroupCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public AddGroupCommand(string name, string code, Guid ownerId)
		{
			Name = name;
			Code = code;
			OwnerId = ownerId;
		}

		[Required] public string Name { get; set; }

		public string Code { get; set; }

		[Required] public Guid OwnerId { get; set; }
	}
}
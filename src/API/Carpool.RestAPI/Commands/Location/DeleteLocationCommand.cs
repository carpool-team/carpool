using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Location
{
	public class DeleteLocationCommand : IRequest<Core.Models.Location>
	{
		[JsonConstructor]
		public DeleteLocationCommand(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}
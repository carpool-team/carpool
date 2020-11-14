using System;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
	public class DeleteGroupCommand : IRequest
	{
		public DeleteGroupCommand(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}
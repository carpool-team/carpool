using System;
using MediatR;

namespace RestApi.Commands.GroupCommands
{
	public class DeleteGroupCommand : IRequest
	{
		public DeleteGroupCommand(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}
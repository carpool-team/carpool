using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.User
{
	public class DeleteUserCommand : IRequest<Core.Models.User>
	{
		[JsonConstructor]
		public DeleteUserCommand(Guid userId)
			=> UserId = userId;


		public Guid UserId { get; set; }
	}
}
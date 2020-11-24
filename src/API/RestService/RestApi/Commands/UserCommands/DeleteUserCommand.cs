using System;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class DeleteUserCommand : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public DeleteUserCommand(Guid userId)
			=> UserId = userId;


		public Guid UserId { get; set; }
	}
}
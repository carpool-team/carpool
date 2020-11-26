using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class DeleteUserCommand : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public DeleteUserCommand(UserId userId)
			=> UserId = userId;


		public UserId UserId { get; set; }
	}
}
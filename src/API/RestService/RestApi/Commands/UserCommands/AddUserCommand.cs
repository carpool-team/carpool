using System.Text.Json.Serialization;
using Domain.Entities;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class AddUserCommand : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public AddUserCommand(string firstName, string lastName, string email)
		{
			FirstName = firstName;
			LastName = lastName;
			Email = email;
		}

		public string FirstName { get; }

		public string LastName { get; }

		public string Email { get; }
	}
}
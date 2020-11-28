using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class UpdateUserCommand : IRequest<UserId>
	{
		[JsonConstructor]
		public UpdateUserCommand(UserId userId, string firstName, string lastName)
		{
			UserId = userId;
			FirstName = firstName;
			LastName = lastName;
		}

		public UserId UserId { get; }
		public string FirstName { get; }

		public string LastName { get; }

	}
}
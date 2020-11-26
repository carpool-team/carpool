using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class AddUserRatingCommand : IRequest<Rating>
	{
		public AddUserRatingCommand(UserId? userId, byte value)
		{
			UserId = userId;
			Value = value;
		}

		public UserId? UserId { get; set; }
		public byte Value { get; set; }
	}
}
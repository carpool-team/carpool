using System;
using Domain.ValueObjects;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class AddUserRatingCommand : IRequest<Rating>
	{
		public AddUserRatingCommand(Guid? userId, byte value)
		{
			UserId = userId;
			Value = value;
		}

		public Guid? UserId { get; set; }
		public byte Value { get; set; }
	}
}
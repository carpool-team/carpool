using System;
using Carpool.Core.ValueObjects;
using MediatR;

namespace Carpool.RestAPI.Commands.User
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
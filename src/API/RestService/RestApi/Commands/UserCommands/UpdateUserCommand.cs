using System;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class UpdateUserCommand : IRequest<Guid>
	{
		[JsonConstructor]
		public UpdateUserCommand(Guid? userId, string firstName, string lastName, int? companyId)
		{
			UserId = userId;
			FirstName = firstName;
			LastName = lastName;
			CompanyId = companyId;
		}

		public Guid? UserId { get; set; }
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public int? CompanyId { get; set; }
	}
}
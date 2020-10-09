using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.User
{
	public class UpdateUserCommand : IRequest
	{
		[JsonConstructor]
		public UpdateUserCommand(Guid? userId, string firstName, string lastName, Guid? companyId)
		{
			UserId = userId;
			FirstName = firstName;
			LastName = lastName;
			CompanyId = companyId;
		}
		
		public Guid? UserId { get; set; }
		public string FirstName { get; set; }

		public string LastName { get; set; }
		
		public Guid? CompanyId { get; set; }
	}
}
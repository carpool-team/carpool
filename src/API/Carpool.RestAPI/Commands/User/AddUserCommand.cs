using System;
using MediatR;

namespace Carpool.RestAPI.Commands.User
{
	public class AddUserCommand : IRequest<Core.Models.User>
	{
		public AddUserCommand(string firstName, string lastName, int? companyId)
		{
			FirstName = firstName;
			LastName = lastName;
			CompanyId = companyId;
		}

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public int? CompanyId { get; set; }
	}
}
using Domain.Entities;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class AddUserCommand : IRequest<ApplicationUser>
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
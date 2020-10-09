using System;
using MediatR;

namespace Carpool.RestAPI.Commands.User
{
	public class AddUserCommand : IRequest<Core.Models.User>
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public Guid CompanyId { get; set; }
	}
}
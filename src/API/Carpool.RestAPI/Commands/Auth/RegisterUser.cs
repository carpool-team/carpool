using System;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Auth
{
	public class RegisterUser : IRequest<IdentityResult>
	{
		[JsonConstructor]
		public RegisterUser(string email, string password, string firstName, string lastName, Guid? groupId)
			=> (Email, Password, FirstName, LastName, GroupId) 
			   = (email, password, firstName, lastName, groupId);
		

		public string Email { get; init; }
		public string Password { get; init; }
		public string FirstName { get; init; }
		public string LastName { get; init; }
		public Guid? GroupId { get; init; }
	}
}
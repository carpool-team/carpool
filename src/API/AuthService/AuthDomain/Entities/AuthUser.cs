using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AuthDomain.Entities
{
	public sealed class AuthUser : IdentityUser
	{
		public AuthUser(string userName) : base(userName)
		{
			
		}
		public AuthUser(string userName, string firstName, string lastName) : this(userName)
		{
			FirstName = firstName;
			LastName = lastName;
		}

		public AuthUser(string userName, string email, string firstName, string lastName) : this(userName, firstName, lastName)
		{
			Email = email;
		}

		public string FirstName { get; set; }
		public string LastName { get; set; }
		public List<RefreshToken> RefreshTokens { get; set; }
	}
}
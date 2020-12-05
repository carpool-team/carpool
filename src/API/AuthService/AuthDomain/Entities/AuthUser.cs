using System.Collections.Generic;
using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Identity;

namespace AuthDomain.Entities
{
	public sealed class AuthUser : IdentityUser
	{
		public AuthUser(string userName, string email, string firstName, string lastName, AppUserId appUserId) : base(email)
			=> (Email, FirstName, LastName, AppUserId) = (email, firstName, lastName, appUserId);

		public string FirstName { get; set; }
		public string LastName { get; set; }
		public List<RefreshToken> RefreshTokens { get; set; }
		public AppUserId AppUserId { get; set; }
	}
}
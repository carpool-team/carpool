using System.Collections.Generic;
using Domain.Abstract;
using Domain.Contracts;
using Domain.Entities.Intersections;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
	public sealed class ApplicationUser : BaseEntity<AppUserId>
	{
		public ApplicationUser(AppUserId id, string email, string firstName, string lastName)
			=> (Id, Email, FirstName, LastName)
				= (id, email, firstName, lastName);

		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public IReadOnlyList<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
		public List<Rating> Ratings { get; set; } = new();
		public Vehicle? Vehicle { get; set; }
		
	}
}
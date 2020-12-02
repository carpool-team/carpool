using AuthDomain.Entities;
using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthServer.Data
{
	public class ApplicationDbContext : IdentityDbContext<AuthUser>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options) { }
	}
}
using AuthDomain.Entities;
using AuthServer.Extensions;
using IdentifiersShared.Converters;
using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace AuthServer.Data
{
	public class ApplicationDbContext : IdentityDbContext<AuthUser>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			_ = modelBuilder ?? throw new NullReferenceException(nameof(modelBuilder));

			modelBuilder.UseValueConverter(new UserIdValueConverter());

			base.OnModelCreating(modelBuilder);
		}
	}
}
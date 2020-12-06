using System;
using Auth.DataAccessLayer.Extensions;
using AuthDomain.Entities;
using IdentifiersShared.Converters;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Auth.DataAccessLayer.DatabaseContexts
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
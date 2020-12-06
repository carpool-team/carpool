using System;
using AuthDomain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.DataAccessLayer.Builders
{
	public class AuthUserBuilder : IEntityTypeConfiguration<AuthUser>
	{
		public void Configure(EntityTypeBuilder<AuthUser> builder)
		{
			builder.HasKey(x => x.Id);
			
			builder.OwnsMany(x => x.RefreshTokens, x =>
			{
				x.ToTable("RefreshTokens");
				x.WithOwner().HasForeignKey("AuthUserId");
				x.Property<Guid>("Id");
				x.Property(a => a.Token).IsRequired();
				x.Property(a => a.Created).IsRequired();
				x.Property(a => a.Expires).IsRequired();
				x.Property(a => a.Revoked);
				x.HasKey("Id");
			});

			builder.Property(x => x.FirstName).IsRequired();
			builder.Property(x => x.LastName).IsRequired();
			builder.Property(x => x.AppUserId).IsRequired();
		}
	}
}
﻿using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders
{
	public class ApplicationUserBuilder : IEntityTypeConfiguration<ApplicationUser>
	{
		public void Configure(EntityTypeBuilder<ApplicationUser> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));
			builder.ToTable("Users");
			builder.HasKey(x => x.Id);
			builder.Property(x => x.FirstName).IsRequired();
			builder.Property(x => x.LastName).IsRequired();
			builder.Property(x => x.Email).IsRequired();

			builder.OwnsMany(x => x.Ratings, x =>
			{
				x.ToTable("Ratings");
				x.WithOwner().HasForeignKey("AppUserId");
				x.Property<Guid>("Id");
				x.Property(a => a.Value).IsRequired();
				x.HasKey("Id");
			});

			builder.HasMany(x => x.UserGroups)
				.WithOne(x => x.ApplicationUser)
				.HasForeignKey(ug => ug.AppUserId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(x => x.Vehicle)
				.WithOne()
				.HasForeignKey<Vehicle>(v => v.AppUserId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
using System;
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

			builder.Property(x => x.FirstName);
			builder.Property(x => x.LastName);

			builder.OwnsMany(x => x.Ratings, x =>
			{
				x.ToTable("Ratings");
				x.WithOwner().HasForeignKey("UserId");
				x.Property<Guid>("Id");
				x.Property(x => x.Value).IsRequired();
				x.HasKey("Id");
			});

			//  builder.HasMany(x => x.CreatedRides)
			//.WithOne()
			//.HasForeignKey(r => r.OwnerId)
			//         .OnDelete(DeleteBehavior.Cascade);

			//  builder.HasMany(x => x.ParticipatedRides)
			//.WithOne()
			//.HasForeignKey(r => r.UserId)
			//.OnDelete(DeleteBehavior.Cascade);

			//builder.HasMany(x => x.RideRequests)
			//       .WithOne()
			//       .HasForeignKey(r => r.RequesterId)
			//       .OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(x => x.UserGroups)
				.WithOne(x => x.ApplicationUser)
				.HasForeignKey(ug => ug.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(x => x.Vehicle)
				.WithOne()
				.HasForeignKey<ApplicationUser>(v => v.VehicleId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
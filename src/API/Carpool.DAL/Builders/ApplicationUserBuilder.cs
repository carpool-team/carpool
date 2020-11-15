using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
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

			builder.OwnsMany(x => x.Ratings)
			       .WithOwner()
			       .HasForeignKey(x => x.UserId);


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
using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders
{
	public class RideRequestBuilder : IEntityTypeConfiguration<RideRequest>
	{
		public void Configure(EntityTypeBuilder<RideRequest> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.IsAccepted).IsRequired();
			builder.Property(x => x.IsPending).IsRequired();
			builder.Property(x => x.DateAdded).IsRequired();

			builder.HasOne(x => x.RequestingUser)
				.WithMany()
				.HasForeignKey(x => x.RequestingUserId)
				.OnDelete(DeleteBehavior.NoAction)
				.IsRequired();

			builder.HasOne(x => x.RideOwner)
				.WithMany()
				.HasForeignKey(x => x.RideOwnerId)
				.OnDelete(DeleteBehavior.NoAction)
				.IsRequired();

			builder.HasOne(x => x.Ride)
				.WithMany(r => r.RideRequests)
				.HasForeignKey(x => x.RideId)
				.OnDelete(DeleteBehavior.Cascade)
				.IsRequired();

			builder.OwnsOne(x => x.Location);
		}
	}
}
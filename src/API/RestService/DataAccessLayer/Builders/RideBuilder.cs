using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders
{
	public class RideBuilder : IEntityTypeConfiguration<Ride>
	{
		public void Configure(EntityTypeBuilder<Ride> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Date).IsRequired();
			builder.Property(x => x.Price).IsRequired();
			builder.Property(x => x.RideDirection).IsRequired();
			builder.Property(x => x.SeatsLimit).IsRequired();

			builder.HasMany(x => x.Participants)
				.WithOne()
				.HasForeignKey(r => r.RideId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(x => x.Stops)
				.WithOne()
				.HasForeignKey(x => x.RideId)
				.OnDelete(DeleteBehavior.Cascade);
			
			builder.HasOne(x => x.Group)
				.WithMany(x => x.Rides)
				.HasForeignKey(x => x.GroupId)
				.OnDelete(DeleteBehavior.NoAction);

			builder.HasOne(x => x.Owner)
				.WithMany()
				.HasForeignKey(x => x.OwnerId)
				.OnDelete(DeleteBehavior.NoAction);
			
			builder.OwnsOne(x => x.Location);

		}
	}
}
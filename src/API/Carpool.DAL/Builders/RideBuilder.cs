using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class RideBuilder : IEntityTypeConfiguration<Ride>
	{
		public void Configure(EntityTypeBuilder<Ride> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Date).IsRequired();
			builder.Property(x => x.Price).IsRequired();

			builder.HasMany(x => x.Participants)
			       .WithOne()
			       .HasForeignKey(r => r.RideId)
			       .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Stops)
			       .WithOne()
			       .HasForeignKey(x => x.RideId)
			       .OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(x => x.Destination)
			       .WithMany()
			       .HasForeignKey(x => x.DestinationId)
			       .OnDelete(DeleteBehavior.NoAction);


			builder.HasOne(x => x.StartingLocation)
			       .WithMany()
			       .HasForeignKey(x => x.StartingLocationId)
			       .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Group)
                .WithMany()
                .HasForeignKey(x => x.GroupId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Owner)
                .WithMany()
                .HasForeignKey(x => x.OwnerId)
                .OnDelete(DeleteBehavior.NoAction);
        }
	}
}
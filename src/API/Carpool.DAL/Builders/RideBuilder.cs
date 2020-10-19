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
                .OnDelete(DeleteBehavior.ClientNoAction);


            builder.HasMany(x => x.Stops)
                .WithOne()
                .HasForeignKey(x => x.RideId);

            builder.HasOne(x => x.Destination)
                .WithMany()
                .HasForeignKey(x => x.DestinationId)
                .OnDelete(DeleteBehavior.ClientNoAction);


            builder.HasOne(x => x.StartingLocation)
                .WithMany()
                .HasForeignKey(x => x.StartingLocationId)
                .OnDelete(DeleteBehavior.ClientNoAction);

        }
    }
}